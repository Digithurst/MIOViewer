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

import { History } from "history";

import { ParserUtil, KBVBundleResource, Vaccination } from "@kbv/mioparser";

import BaseModel from "../BaseModel";

export default class AdditionalCommentModel extends BaseModel<
    | Vaccination.V1_00_000.Profile.Practitioner
    | Vaccination.V1_00_000.Profile.PractitionerAddendum
    | Vaccination.V1_00_000.Profile.Organization
> {
    constructor(
        value:
            | Vaccination.V1_00_000.Profile.Practitioner
            | Vaccination.V1_00_000.Profile.PractitionerAddendum
            | Vaccination.V1_00_000.Profile.Organization,
        parent: KBVBundleResource,
        history?: History
    ) {
        super(value, parent, history);

        this.headline = "";

        const additionalComments = ParserUtil.getSlices<
            Vaccination.V1_00_000.Extension.AdditionalComment
        >([Vaccination.V1_00_000.Extension.AdditionalComment], this.value.extension);
        this.values = [
            {
                value: additionalComments.length
                    ? additionalComments.map((c) => c.valueString).join(", ")
                    : "-",
                label: "Ergänzende Angaben"
            }
        ];
    }

    public toString(): string {
        return this.values
            .filter((v) => v.value !== "-" && !v.label.includes("Geburtsname"))
            .map((v) => v.label + ": " + v.value)
            .join("\n");
    }
}
