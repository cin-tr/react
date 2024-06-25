import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "./About.scss";
import { withRouter } from "react-router";

class About extends Component {
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-container">
                    <div className="section-header ">
                        <span className="title-section">
                            Thông tin thêm về website
                        </span>
                    </div>
                    <div className="section-about-content">
                        <div className="content-left">
                            <iframe
                                width="100%"
                                height="400"
                                src="https://www.youtube.com/embed/QsUURpGABdU"
                                title="nhạc genz cho hè chill | Em Có Quen Người Nào Chưa TikTok |  Lưu Luyến Sau Chia Tay x Thức Giấc Lofi"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <div className="content-right">
                            <p>
                                Tìm hiểu thông tin y khoa xác thực, hữu ích tại
                                Website 👨‍⚕️👩‍⚕️ Bạn đang tìm kiếm thông tin y khoa
                                uy tín để chăm sóc sức khỏe bản thân và gia
                                đình? Hãy truy cập Sống khỏe cùng với các bài
                                viết được kiểm duyệt bởi đội ngũ bác sĩ chuyên
                                khoa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(About));
