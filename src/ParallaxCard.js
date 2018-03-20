import React from 'react';
import PropTypes from 'prop-types';
import './ParallaxCard.sass';

export default class ParallaxCard extends React.Component {
  static propTypes = {
        layers: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    state = {
        rootElemWidth: 0,
        rootElemHeight: 0,
        isOnHover: false,
        container: {},
        shine: {},
        layers: []
    };


    componentDidMount = () => {
        if (!this.props.isStatic) {
            this.setState({
                rootElemWidth: this.node.clientWidth || this.node.offsetWidth || this.node.scrollWidth,
                rootElemHeight: this.node.clientHeight || this.node.offsetHeight || this.node.scrollHeight
            });
        }
    };

    handleMove = ({pageX, pageY}) => {
        const layerCount = this.props.layers.length;
        const {rootElemWidth, rootElemHeight} = this.state;
        const bodyScrollTop = document.body.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
        const bodyScrollLeft = document.body.scrollLeft;
        const offsets = this.node.getBoundingClientRect();
        const wMultiple = 320 / rootElemWidth;
        const offsetX = 0.52 - (pageX - offsets.left - bodyScrollLeft) / rootElemWidth;
        const offsetY = 0.52 - (pageY - offsets.top - bodyScrollTop) / rootElemHeight;
        const dy = pageY - offsets.top - bodyScrollTop - rootElemHeight / 2;
        const dx = pageX - offsets.left - bodyScrollLeft - rootElemWidth / 2;
        const yRotate = (offsetX - dx) * (0.07 * wMultiple);
        const xRotate = (dy - offsetY) * (0.1 * wMultiple);
        const arad = Math.atan2(dy, dx);
        const rawAngle = arad * 180 / Math.PI - 90;
        const angle = rawAngle < 0 ? rawAngle + 360 : rawAngle;

        this.setState({
            container: {
                transform: `rotateX(${xRotate}deg) rotateY(${yRotate}deg) ${this.state.isOnHover ? ' scale3d(1.07,1.07,1.07)' : ''}`
            },
            shine: {
                background: `linear-gradient(${angle}deg, rgba(255, 255, 255, ${(pageY - offsets.top - bodyScrollTop) /
                rootElemHeight * 0.4}) 0%, rgba(255, 255, 255, 0) 80%)`,
                transform: `translateX(${offsetX * layerCount - 0.1}px) translateY(${offsetY * layerCount - 0.1}px)`
            },
            layers: this.props.layers.map((_, idx) => ({
                transform: `translateX(${(offsetX * (layerCount - idx)) * ((idx * 2.5) / wMultiple)}px) translateY(${offsetY * layerCount * ((idx * 2.5) / wMultiple)}px)`,
            }))
        });
    };

    handleTouchMove = (evt) => {
        evt.preventDefault();
        const {pageX, pageY} = evt.touches[0];
        this.handleMove({pageX, pageY});
    };

    handleEnter = () => {
        this.setState({isOnHover: true});
    };

    handleLeave = () => {
        this.setState({
            isOnHover: false,
            container: {},
            shine: {},
            layers: []
        });
    };

    renderLayers = () => {
        return (
            <div className="parallax-card-layers">
                {
                    this.props.layers && this.props.layers.map((imgSrc, idx) => {
                        const layerIndex = idx;
                        return (
                            <div
                                style={{backgroundImage: `url(${imgSrc})`, ...(this.state.layers[idx] ? this.state.layers[idx] : {})}}
                                className="parallax-card-rendered-layer"
                                key={`layer-${layerIndex}`}
                            />
                        );
                    })
                }
            </div>
        );
    };

    render() {
        return (
            <div
                style={{transform: `perspective(${this.state.rootElemWidth * 3}px)`}}
                onMouseMove={this.handleMove}
                onMouseEnter={this.handleEnter}
                onMouseLeave={this.handleLeave}
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleEnter}
                onTouchEnd={this.handleLeave}
                className="parallax-card"
                ref={(node) => { this.node = node;}} >
                <div className="parallax-card-container" style={{...this.state.container}}>
                    <div className="parallax-card-shadow" />
                    <div className="parallax-card-shine" style={{...this.state.shine }} />
                    {this.renderLayers()}
                </div>
            </div>
        );
    }
}
