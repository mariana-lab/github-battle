import PropTypes from "prop-types";
import React from "react";
import { fetchPopularRepos } from "../utils/api";

//Abstraction of list on its own statless functional component
//it's still a pure function even though it's receiving a cb that changes the state
//function LanguagesNav(props) {
function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python"];

  return (
    //it's returning a js object, all of this is js! See babel website :3
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: "rgb(187,46,31)" } : null}
            onClick={() => {
              onUpdateLanguage(language);
            }}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: null,
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount(){
      this.updateLanguage(this.state.selectedLanguage)
  }


  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage, error: null, repos: null });

    fetchPopularRepos(selectedLanguage)
      .then((repos) => 
        this.setState({
          repos,
          error: null
        }))
      .catch(() => {
        console.warn("Error fetching repos: ", error);
        this.setState({
          repos: null,
          error: "There was an error fetching the repositories"
        });
      });
  }

  isLoading() {
    return this.state.repos === null && this.state.error === null
  }

  render() {
    //destructuring - is going to select only the selectedLanguage property
    const { selectedLanguage, repos, error } = this.state;

    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        ></LanguagesNav>
        {this.isLoading() && <p>LOADING...</p>}
        {error && <p>{error}</p>}
        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </React.Fragment>
    );
  }
}
