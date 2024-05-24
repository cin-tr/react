import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}
    render() {
        return (
            <>
                <HomeHeader />
                <div>hello from DetailSpecialty</div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
