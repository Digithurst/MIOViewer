/*
 * (C) Copyright Digithurst GmbH & Co KG
 *
 * File: OpenFile.tsx
 * Author: Pascal Tänzer
 * Date: 07.04.2022
 *
 * This file is part of the modifications made to the MIO Viewer by the Digithurst GmbH & Co KG.
 *
 * MIO Viewer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation version 3 of the License only.
 *
 * MIO Viewer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with MIO Viewer. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";

import { RouteComponentProps } from "react-router";
import { withIonLifeCycle } from "@ionic/react";

import { MIOConnector, MIOConnectorType } from "../../../store";

import { UI } from "../../../components";

import "./OpenFile.scss";
import { KBVBundleResource } from "@kbv/mioparser";

export type OpenFileState = {
    filename: string;
    showError: boolean;
    errorMessage: string;
    loading: boolean;
    loadingFailed: boolean;
};

class OpenFile extends React.Component<
    MIOConnectorType & RouteComponentProps,
    OpenFileState
> {
    protected addMIOHelper: UI.AddMIOHelper;

    constructor(props: MIOConnectorType & RouteComponentProps) {
        super(props);

        this.state = {
            filename: "",
            showError: false,
            errorMessage: "",
            loading: false,
            loadingFailed: false
        };

        this.addMIOHelper = new UI.AddMIOHelper(
            this.props,
            this.onAddMIOHelperParseFiles,
            this.onAddMIOHelperStateChange
        );
    }

    /**
     * Handler method for AddMIOHelper.
     */
    onAddMIOHelperStateChange = (): void => {
        const { hasError } = this.addMIOHelper.state;
        if (hasError) {
            //When the AddMIOHelper encounters an error, set loadingFailed, so the user is informed about it
            //after closing the modal rendered in the AddMIOHelper.
            this.setState({ loadingFailed: true });
        } else {
            this.setState({});
        }
    };

    /**
     * Handler method for AddMIOHelper.
     */
    onAddMIOHelperParseFiles = (lastMio: KBVBundleResource): void => {
        if (typeof lastMio !== "undefined") {
            //replace with home, then push lat mio, that the user lands on the home page when pressing the back button
            this.props.history.replace("/home");
            this.props.history.push("/mio/" + lastMio.identifier.value);
        }
    };

    /**
     * Called after loading the page. We load the file and send it to the AddMIOHelper here.
     * The file is loaded from a URL built from the search parameters.
     * Search parameters used:
     *  - urlPrefix: put before the filename. Defaults to the environment variable REACT_APP_OPEN_FILE_DEFAULT_PREFIX
     *  - name: the filename or path to the file. Required.
     *  - urlSuffix: put after the filename. Optional.
     */
    componentDidMount() {
        this.setState({ loading: true });
        const params = new URLSearchParams(this.props.location.search);

        const defaultPrefix = process.env.REACT_APP_OPEN_FILE_DEFAULT_PREFIX;
        const urlPrefix = params.get("urlPrefix") ?? defaultPrefix ?? "";
        const name = params.get("name") ?? "";

        console.log(`urlPrefix: ${urlPrefix} name: ${name}`);
        if (!this.validateSearchParams(urlPrefix, name)) {
            return;
        }

        const url = urlPrefix + name;
        this.loadFile(url, name);
    }

    /**
     * Validates the search params. Even though the urlPrefix is replaced by a default value, it can still be empty,
     * because ?? only replaces null or undefined values.
     * If the validation fails, loading, loadingFailed, showError and errorMessage are updated in the state to render
     * the correct errors.
     * @param urlPrefix must not be empty
     * @param name must not be empty
     * @return true if both values are not empty. Updates the state and returns false otherwise.
     * @private
     */
    private validateSearchParams(urlPrefix: string | undefined, name: string): boolean {
        if (null == urlPrefix || urlPrefix.length <= 0) {
            this.setState({
                loading: false,
                loadingFailed: true,
                showError: true,
                errorMessage: "Keine URL für die Datei angegeben."
            });
            return false;
        }

        if (name.length <= 0) {
            this.setState({
                loading: false,
                loadingFailed: true,
                showError: true,
                errorMessage: "Kein Dateiname angegeben."
            });
            return false;
        }

        return true;
    }

    /**
     * Loads the file from the given url. If the request fails, the state is updated accordingly. If a file is returned
     * with an OK status, pass it to the AddMIOHelper.
     * @param url url to load the file.
     * @param filename name of the file.
     * @protected
     */
    protected loadFile(url: string, filename: string) {
        console.log("Fetching file from: " + url);
        fetch(url)
            //Parse the response, if it is ok continue, otherwise throw an error containing the status code, text
            //and the body of the response.
            .then((res) => {
                if (res.ok) {
                    return res.blob();
                } else {
                    return res.text().then((text) => {
                        throw new Error(`${res.status}: ${res.statusText}. ${text}`);
                    });
                }
            })
            //Convert the body to a file and pass it to the AddMIOHelper.
            .then((blob) => {
                const file = new File([blob], filename);
                this.setState({ loading: false });
                this.addMIOHelper.onSelect([file]);
            })
            //Update the state in case of an error.
            .catch((error) => {
                console.log(error);
                this.setState({
                    loading: false,
                    loadingFailed: true,
                    showError: true,
                    errorMessage: error.toString()
                });
            });
    }

    /**
     * Renders a modal dialog containing the error. The dialog is only shown, if showError is set.
     * @protected
     */
    protected renderErrorModal(): JSX.Element {
        const { showError, errorMessage } = this.state;
        return (
            <UI.Modal
                headline={"Fehler"}
                content={
                    <div className={"error-content"}>
                        <div className={"texts"}>
                            <p>Die Datei kann nicht geladen werden.</p>
                            <p>{errorMessage}</p>
                        </div>
                    </div>
                }
                show={showError}
                onClose={() => this.setState({ showError: false })}
                // onClose={() => this.props.history.push("/home")}
            />
        );
    }

    /**
     * Renders a loading animation, while the file is fetched (loading is true in the status).
     * @protected
     */
    protected renderLoadingAnimation(): JSX.Element | undefined {
        const { loading } = this.state;
        if (loading) {
            return (
                <>
                    <UI.LoadingAnimation
                        id={"lottie-loading-file"}
                        loadingText="Öffne Datei"
                    />
                </>
            );
        }
    }

    /**
     * Render a BasicView informing the user that the loading failed (if loadingFailed is true in the state).
     * loadingFailed should be set when any error is encountered while loading, parsing the file in the AddMIOHelper
     * or elsewhere.
     * @protected
     */
    protected renderLoadingFailed(): JSX.Element | undefined {
        const { loadingFailed } = this.state;
        if (loadingFailed) {
            return (
                <UI.BasicView headline={"Fehler"} padding={false} id={"main"}>
                    <p
                        className={"intro-text ion-margin-bottom"}
                        data-testid={"intro-text"}
                    >
                        Die Datei konnte nicht geöffnet werden. Bitte schließen Sie das
                        Browserfenster und versuchen Sie es erneut.
                    </p>
                </UI.BasicView>
            );
        }
    }

    render(): JSX.Element {
        const { loading } = this.props;
        return (
            <>
                {this.renderLoadingAnimation()}
                {this.renderErrorModal()}
                {this.addMIOHelper.render(loading, "file")}
                {this.renderLoadingFailed()}
            </>
        );
    }
}

export default MIOConnector(withIonLifeCycle(OpenFile));
