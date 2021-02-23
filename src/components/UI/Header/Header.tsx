/*
 * Copyright (c) 2020. Kassenärztliche Bundesvereinigung, KBV
 *
 * This file is part of MIO Viewer.
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
import * as Icons from "react-feather";

import { IonHeader } from "@ionic/react";
import ButtonIcon from "../ButtonIcon";

import "./Header.scss";
import TextFit from "./TextFit";

type HeaderProps = {
    headline: string;
    headerClass?: string;
    percent: number;
    pdfDownload?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    back?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default class Header extends React.Component<HeaderProps> {
    static defaultProps = {
        percent: 0
    };

    render(): JSX.Element {
        const { headline, headerClass, percent, back, pdfDownload } = this.props;

        const p = 64 * percent;
        const divStyle = {
            transform: `translate(0px, ${-p}px)`
        };

        const navStyle = {
            top: `${p}px`
        };

        const textStyle = {
            top: 16 + p,
            bottom: 16
        };

        const hlStyle = {
            opacity: 1 - percent
        };

        const hl5Style = {
            opacity: percent
        };

        const classes = ["miov", headerClass];
        return (
            <IonHeader className={classes.join(" ")} style={divStyle}>
                <nav style={navStyle} data-testid={"header-nav"}>
                    {back && (
                        <ButtonIcon
                            icon={Icons.CornerUpLeft}
                            onClick={back}
                            dataTestId={"back-button"}
                            text={"Zurück"}
                        />
                    )}
                    {pdfDownload && (
                        <ButtonIcon
                            icon={Icons.Upload}
                            onClick={pdfDownload}
                            className={"pdf-download"}
                            dataTestId={"pdf-button"}
                            text={"Export"}
                            rightToLeft={true}
                        />
                    )}
                </nav>

                <div className={"headline-container"} style={textStyle}>
                    <h2 style={hlStyle} data-testid={"header-headline"}>
                        <TextFit compressor={1.5} maxFontSize={30}>
                            {headline}
                        </TextFit>
                    </h2>
                    <h5 style={hl5Style}>
                        <TextFit compressor={1.5} maxFontSize={16}>
                            {headline}
                        </TextFit>
                    </h5>
                </div>
            </IonHeader>
        );
    }
}
