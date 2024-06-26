import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
        };
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : [],
            });
        }
    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };

    render() {
        let { dataClinic } = this.state;
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.medical-facility" />
                        </span>
                        <button className="btn-section">
                            <Link to={`detail-clinic/11`}>
                                <FormattedMessage id="homepage.more-infor" />
                            </Link>
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic &&
                                dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div
                                            className="section-customize clinic-child"
                                            key={index}
                                            onClick={() =>
                                                this.handleViewDetailClinic(
                                                    item
                                                )
                                            }
                                        >
                                            <div className="wrap">
                                                <div
                                                    className="bg-image section-medical-facility"
                                                    style={{
                                                        backgroundImage: `url(${item.image})`,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="name">
                                                <div className="clinic-name">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
