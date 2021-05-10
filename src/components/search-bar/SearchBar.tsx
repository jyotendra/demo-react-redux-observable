import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { of, Observable } from 'rxjs';
import classNames from "classnames";
import "./SearchBar.scss";
import React from "react";



export default class SearchBar extends React.Component<ISearchBarProps, ISearchBarStates> {

    static defaultProps = {
        widthUnit: "%",
        searchBarWidth: 40,
        searchResults: [],
        searchCbk: (query: Observable<string>) => { query.subscribe(q => { console.log(q) }) },
        resultClickFn: (meta: any) => { console.log(meta) },
    }

    constructor(props: ISearchBarProps) {
        super(props);
        this.state = {
            resultsContainerClasses: {
                "search-result-container": true,
                "search-focused": false,
                "search-defocused": true
            },
            shouldDisplayResults: false
        };
    }

    changeResultsContainerDisplay(shouldDisplay: boolean) {
        this.setState({ shouldDisplayResults: shouldDisplay });
        this.setState({
            resultsContainerClasses: Object.assign({},
                this.state.resultsContainerClasses,
                {
                    "search-focused": Boolean(shouldDisplay && this.props.searchResults.length > 0),
                    "search-defocused": !shouldDisplay
                })
        });
    }


    render() {
        const { searchBarWidth, widthUnit } = this.props;
        return (
            <div className="search-bar"
                onFocus={() => this.changeResultsContainerDisplay(true)}
                onBlur={() => this.changeResultsContainerDisplay(false)}
            >
                <div className="search-button">
                    <FontAwesomeIcon id="search-icon" icon={faSearch} />
                </div>
                <div style={{ width: `${searchBarWidth}${widthUnit}` }} className="search-text-container">
                    <input data-testid="search-bar-input" onChange={e => this.props.searchCbk(of(e.target.value))} className="search-text" />
                </div>
                <div
                    data-testid="search-results-container"
                    style={{ width: `${searchBarWidth * 0.93}${widthUnit}` }}
                    className={classNames(this.state.resultsContainerClasses)}>
                    {
                        this.props.searchResults.map((result, idx) =>
                            <div className="result-entries" key={idx}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    this.props.resultClickFn(result.meta)
                                }}
                                onTouchStart={(e) => {
                                    e.preventDefault();
                                    this.props.resultClickFn(result.meta)
                                }}
                            >
                                <div><p>{result.title}</p></div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

}


export interface ISearchResults {
    title: string;
    meta: any;
}

interface ISearchBarProps {
    widthUnit: string;
    searchBarWidth: number;
    searchResults: ISearchResults[];
    searchCbk: (query: Observable<string>) => void;
    resultClickFn: (meta: any) => void;
}

interface ISearchBarStates {
    shouldDisplayResults: boolean;
    resultsContainerClasses: { [key: string]: boolean };
}

