import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import specialtyImg from "../../../assets/specialty/co-xuong-khop.jpeg";
class Specialty extends Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            Chuyên khoa phổ biến
                        </span>
                        <button className="btn-section">xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                            <div className="section-customize">
                                <div className="bg-image section-specialty"></div>
                                <div>Cơ xương khớp</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
