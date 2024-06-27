import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./DetailHandbook.scss";
import { FormattedMessage } from "react-intl";
import {
    getAllDetailHandbookById,
    getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGE } from "../../../utils";

class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
        };
    }

    async componentDidMount() {
        if (
            this.props.match &&
            this.props.match.params &&
            this.props.match.params.id
        ) {
            let id = this.props.match.params.id;
            let res = await getAllDetailHandbookById({
                id: id,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailHandbook: res.data,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { dataDetailHandbook } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="detail-handbook-container ">
                    <HomeHeader />
                    <div className="detail-handbook-body container">
                        <div className="description-handbook">
                            {dataDetailHandbook &&
                                !_.isEmpty(dataDetailHandbook) && (
                                    <>
                                        <div className="name">
                                            {dataDetailHandbook.name}
                                        </div>
                                        <div
                                            className="des"
                                            dangerouslySetInnerHTML={{
                                                __html: dataDetailHandbook.descriptionHTML,
                                            }}
                                        ></div>
                                    </>
                                )}
                        </div>
                    </div>
                    <HomeFooter />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
