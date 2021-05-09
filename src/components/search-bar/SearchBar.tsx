import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import "./SearchBar.scss";

export default function SearchBar(props: ISearchBarProps) {

    const { searchBarWidth, widthUnit, searchResults } = props;

    return (
        <div className="search-bar">
                <div className="search-button">
                    <FontAwesomeIcon id="search-icon" icon={faSearch} />
                </div>
                <div style={{width: `${searchBarWidth}${widthUnit}`}} className="search-text-container">
                    <FormControl className="search-text" />
                </div>
                <div style={{width: `${searchBarWidth * 0.93}${widthUnit}`}} className="search-result-container">
                    {
                        searchResults.map((result, idx) => 
                            <div className="result-entries" key={idx}><p>{result}</p></div>
                        )
                    }
                </div>
        </div>
    )
}


interface ISearchBarProps {
    widthUnit: string;
    searchBarWidth: number;
    searchResults: string[];
}

SearchBar.defaultProps = {
    widthUnit: "%",
    searchBarWidth: 40,
    searchResults: ["result1", "result2"]
}