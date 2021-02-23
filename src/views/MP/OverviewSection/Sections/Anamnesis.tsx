/*
 * Copyright (c) 2020 - 2021. Kassenärztliche Bundesvereinigung, KBV
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

import { MR, ParserUtil } from "@kbv/mioparser";

import { UI, Util } from "../../../../components";
import * as Models from "../../../../models";

import Section, { SectionProps } from "../Section";

export default class Anamnesis extends Section<MR.V1_00_000.Profile.CompositionAnamneseUndAllgemeineBefunde> {
    constructor(props: SectionProps) {
        super(props);

        this.state = {
            details: [],
            listGroups: []
        };

        this.section = this.getSection([
            MR.V1_00_000.Profile.CompositionAnamneseUndAllgemeineBefunde
        ]);
    }

    protected getDetails(): JSX.Element[] {
        return [];
    }

    protected sortAnamnesis(a: UI.ListItemProps, b: UI.ListItemProps): number {
        const sortingArr = ["Alter", "Körpergewicht", "Körpergröße", "Gravida", "Para"];
        return sortingArr.indexOf(a.label) - sortingArr.indexOf(b.label);
    }

    protected getListGroups(): UI.DetailList.Props[] {
        const { mio, history } = this.props;

        const itemsAnamnesis: UI.ListItemProps[] = [];
        const itemsPreviousPregnancy: UI.ListItemProps[] = [];

        this.section?.entry.forEach((entry) => {
            const ref = entry.reference;
            const resAnamnesis = ParserUtil.getEntryWithRef<
                | MR.V1_00_000.Profile.ObservationAge
                | MR.V1_00_000.Profile.ObservationBaselineWeightMother
                | MR.V1_00_000.Profile.ObservationHeight
                | MR.V1_00_000.Profile.ObservationGravida
                | MR.V1_00_000.Profile.ObservationPara
            >(
                mio,
                [
                    MR.V1_00_000.Profile.ObservationAge,
                    MR.V1_00_000.Profile.ObservationBaselineWeightMother,
                    MR.V1_00_000.Profile.ObservationHeight,
                    MR.V1_00_000.Profile.ObservationGravida,
                    MR.V1_00_000.Profile.ObservationPara
                ],
                ref
            )?.resource;

            if (resAnamnesis) {
                const model = new Models.MP.Basic.ObservationModel(
                    resAnamnesis,
                    mio,
                    history
                );
                const mainValue = model.getMainValue();
                itemsAnamnesis.push({
                    value: mainValue.value,
                    label: mainValue.label,
                    onClick: Util.Misc.toEntryByRef(history, mio, ref, true)
                });
            }

            const resPreviousPregnancy = ParserUtil.getEntryWithRef<MR.V1_00_000.Profile.ObservationPreviousPregnancy>(
                mio,
                [MR.V1_00_000.Profile.ObservationPreviousPregnancy],
                ref
            )?.resource;

            if (resPreviousPregnancy) {
                const model = new Models.MP.Basic.ObservationModel(
                    resPreviousPregnancy,
                    mio,
                    history
                );
                const mainValue = model.getMainValue();
                itemsPreviousPregnancy.push({
                    label: mainValue.value,
                    noValue: true,
                    onClick: Util.Misc.toEntryByRef(history, mio, ref, true)
                });
            }
        });

        return [
            {
                headline: "Allgemeine Angaben",
                items: itemsAnamnesis.sort(this.sortAnamnesis)
            },
            {
                headline: "Angaben zu vorangegangenen Schwangerschaften",
                items: itemsPreviousPregnancy
            }
        ];
    }
}
