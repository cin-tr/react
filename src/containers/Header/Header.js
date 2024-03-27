import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGE } from "../../utils";

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
    };

    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className="languages">
                    <span className="welcome">
                        <FormattedMessage id="home-header.welcome" />
                        {userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ""}
                        !
                    </span>
                    <span
                        className={
                            language === LANGUAGE.VI
                                ? "language-vi  active"
                                : "language-vi"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGE.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            language === LANGUAGE.EN
                                ? "language-en  active"
                                : "language-en"
                        }
                        onClick={() => this.handleChangeLanguage(LANGUAGE.EN)}
                    >
                        EN
                    </span>
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Log out"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                {/* nút logout */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changLanguageAppRedux: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
