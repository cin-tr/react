import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class HomeHeader extends Component {
    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div
                                className="header-logo"
                                onClick={() => this.returnToHome()}
                            ></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <Link to={`detail-specialty/12`}>
                                            <FormattedMessage id="home-header.medical-specialty" />
                                        </Link>
                                    </b>
                                </div>
                                <div
                                    className="subs-title"
                                    onClick={() => this.returnToHome()}
                                >
                                    <FormattedMessage id="home-header.search-doctor-specialty" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <Link to={`detail-clinic/11`}>
                                            <FormattedMessage id="home-header.health-facility" />
                                        </Link>
                                    </b>
                                </div>
                                <div
                                    className="subs-title"
                                    onClick={() => this.returnToHome()}
                                >
                                    <FormattedMessage id="home-header.search-hospital" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <Link to={`detail-doctor/53`}>
                                            <FormattedMessage id="home-header.doctor" />
                                        </Link>
                                    </b>
                                </div>
                                <div
                                    className="subs-title"
                                    onClick={() => this.returnToHome()}
                                >
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="home-header.health-check" />
                                    </b>
                                </div>
                                <div className="subs-title">
                                    <FormattedMessage id="home-header.general-health-check" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="far fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGE.VI
                                        ? "language-vi  active"
                                        : "language-vi"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGE.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGE.EN
                                        ? "language-en active"
                                        : "language-en"
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGE.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">
                                <FormattedMessage id="banner.title-1" />
                            </div>
                            <div className="title2">
                                <FormattedMessage id="banner.title-2" />
                            </div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm chuyên khoa khám bệnh"
                                />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-hospital"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.specialized-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-mobile-alt"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.remote-examination" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-procedures"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.general-health-check" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-diagnoses"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.medical-tests" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-stethoscope"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.mental-health" />
                                    </div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child">
                                        <i className="fas fa-dna"></i>
                                    </div>
                                    <div className="text-child">
                                        <FormattedMessage id="banner.dental-examination" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changLanguageAppRedux: (language) =>
            dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
