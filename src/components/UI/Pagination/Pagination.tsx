/*
 * Copyright (c) 2020 - 2022. Kassenärztliche Bundesvereinigung, KBV
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
import SwiperClass from "swiper/types/swiper-class";

import { UI } from "../../index";

import "./Pagination.scss";

export type PaginationProps = {
    swiper?: SwiperClass;
    currentIndex: number;
    numSlides: number;
    showFirstAndLastButton?: boolean;
};

export default class Pagination extends React.Component<PaginationProps> {
    public static defaultProps = {
        showFirstAndLastButton: false
    };

    protected first = (): void => {
        this.props.swiper?.slideTo(0);
    };

    protected last = async (): Promise<void> => {
        const { swiper, numSlides } = this.props;
        swiper?.slideTo(numSlides - 1);
    };

    protected prev = (): void => {
        const { swiper, currentIndex } = this.props;
        if (currentIndex > 0) {
            swiper?.slideTo(currentIndex - 1);
        }
    };

    protected next = (): void => {
        const { swiper, currentIndex, numSlides } = this.props;
        if (currentIndex < numSlides - 1) {
            swiper?.slideTo(currentIndex + 1);
        }
    };

    render(): JSX.Element {
        const { currentIndex, numSlides, showFirstAndLastButton } = this.props;
        return (
            <div className={"pagination"}>
                <div className={"pagination-bullets-container"}>
                    <div className={"pagination-bullets"}>
                        {Array.from(Array(numSlides)).map((n, index) => (
                            <div
                                className={
                                    "pagination-bullet" +
                                    (index === currentIndex ? " active" : "")
                                }
                                key={`bullet-${index}`}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={
                        "pagination-buttons" +
                        (showFirstAndLastButton ? " first-and-last" : "")
                    }
                >
                    {showFirstAndLastButton && (
                        <UI.ButtonIcon
                            icon={Icons.ChevronsLeft}
                            onClick={this.first}
                            className={"first"}
                            disabled={currentIndex === 0}
                        >
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 32 32"
                                version="1.1"
                            >
                                <title>Icon / Zum Anfang</title>
                                <g
                                    fill="none"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="11" y1="8" x2="11" y2="24" />
                                    <polyline points="23 24 15 16 23 8" />
                                </g>
                            </svg>
                        </UI.ButtonIcon>
                    )}
                    <UI.ButtonIcon
                        icon={Icons.ChevronLeft}
                        onClick={this.prev}
                        className={"prev"}
                        disabled={currentIndex === 0}
                    />
                    {showFirstAndLastButton && (
                        <UI.ButtonIcon
                            icon={Icons.ChevronsRight}
                            onClick={this.last}
                            className={"last"}
                            disabled={currentIndex === numSlides - 1}
                        >
                            <svg
                                width="32px"
                                height="32px"
                                viewBox="0 0 32 32"
                                version="1.1"
                            >
                                <title>Icon / Zum Ende</title>
                                <g
                                    fill="none"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polyline points="9 24 17 16 9 8" />
                                    <line x1="22" y1="8" x2="22" y2="24" />
                                </g>
                            </svg>
                        </UI.ButtonIcon>
                    )}
                    <UI.ButtonIcon
                        icon={Icons.ChevronRight}
                        onClick={this.next}
                        className={"next"}
                        disabled={currentIndex === numSlides - 1}
                    />
                </div>
            </div>
        );
    }
}
