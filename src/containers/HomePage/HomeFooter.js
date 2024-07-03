import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGE } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";

class HomeFooter extends Component {
    changLanguage = (language) => {
        this.props.changLanguageAppRedux(language);
    };

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className="home-footer-container">
                    <div className="home-footer-content">
                        <div className="content-up">
                            <div className="des-1">
                                Đặt lịch nhanh - Khám dễ dàng
                            </div>
                            <div className="des-2">
                                Chăm sóc sức khoẻ toàn diện{" "}
                            </div>
                            <div className="des-3">
                                YourHealth quan tâm đến sức khoẻ một cách tận
                                tâm nhất
                            </div>
                            <div className="des-4">
                                <button className="btn btn-primary btn-footer">
                                    Liên hệ
                                </button>
                            </div>
                            <div className="des-5">&#169; 2024 YourHealth.</div>
                        </div>
                        <div className="content-down">
                            <div className="logo"></div>
                            <div className="contact">
                                <div className="item">Tuyển dụng</div>
                                <div className="item">Chính sách</div>
                                <div className="item">Điều khoản</div>
                                <div className="item">Câu hỏi thường gặp</div>
                            </div>
                            <div className="icon">
                                <div className="icon-footer">
                                    <i className="fab fa-instagram"></i>
                                </div>
                                <div className="icon-footer">
                                    <i className="fab fa-facebook"></i>
                                </div>
                                <div className="icon-footer">
                                    <i className="fab fa-youtube"></i>
                                </div>
                                <div className="icon-footer">
                                    <i className="fab fa-linkedin"></i>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                height: "20px",
                                backgroundColor: "#1a2980",
                            }}
                        ></div>
                    </div>
                </div>
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
    connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
