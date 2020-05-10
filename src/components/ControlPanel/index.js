import React, { Component } from "react";

import Button from "../../UI/Button";
import SynonymModal from "../../UI/SynonymModal";

import "./styles.css";

class ControlPanel extends Component {

    state = {
        synonym: '',
        synonymList: [],
        isModalOpen: false,
        style: []
    }

    componentDidMount() {
        document.addEventListener("selectionchange", this.selectionListener);
    }

    componentWillUnmount() {
        document.removeEventListener("selectionchange", this.selectionListener);
    }


    selectionListener = () => {
        let firstEl = document.getSelection().anchorNode.parentNode;
        let secondElement = firstEl.parentNode;
        let thirdElement = secondElement.parentNode;

        let array = [firstEl.nodeName, secondElement.nodeName, thirdElement.nodeName];

        this.setState({
            style: array.filter(el => el === "I" || el === "B" || el === "U")
        })
    }

    openModal = () => this.setState({ isModalOpen: true });

    closeModal = () => this.setState({ isModalOpen: false });

    getSynonym = async (params) => {
        try {
            const URL = `https://api.datamuse.com/words?ml=${params}`;
            const response = await fetch(URL);
            const data = await response.json();
            this.setState({
                synonymList: data,
                isModalOpen: true
            })
            this.openModal();
        } catch (error) {
            console.error("Error", error);
        }
    }

    setSynonym = (e) => {
        let phrase = e.target.value;
        
        this.setState({
            synonym: phrase,
            isModalOpen: false
        })

        this.state.style.forEach(el => {
            let tag = el.toLowerCase();
            phrase = `<${tag}>${phrase}<${tag}>`
        })

        document.execCommand("insertHTML", false, phrase);
    }

    handleClick = (e) => {
        e.preventDefault();
        let command = e.currentTarget.dataset["command"];
        if (command === "synonym") {
            let selection = window.getSelection().anchorNode.data;
            if (selection) {
                let params = selection.trim().replace(/[^A-Za-z\s!?]/g, ' ').replace(/\s{2,}/g, ' ').split(' ').join('+');
                this.setState({ synonym: params });
                this.getSynonym(params);
            }
        }
        document.execCommand(command, false, null);
    }

    colorChange = (e) => {
        e.preventDefault();
        document.execCommand("foreColor", false, e.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <div id="control-panel">
                    <div id="format-actions">

                        <Button command="bold"
                            active={this.state.style.includes('B')}
                            onClick={this.handleClick}>
                            <b>B</b>
                        </Button>

                        <Button command="italic"
                            active={this.state.style.includes('I')}
                            onClick={this.handleClick}>
                            <i>I</i>
                        </Button>

                        <Button command="underline"
                            active={this.state.style.includes('U')}
                            onClick={this.handleClick}>
                            <u>U</u>
                        </Button>

                        <Button command="synonym" onClick={this.handleClick}>
                            <span>Synonym</span>
                        </Button>

                        <input type="color" name="color" onChange={this.colorChange} />
                    </div>
                </div>

                <SynonymModal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} synonym={this.state.synonym} setSynonym={this.setSynonym} synonymList={this.state.synonymList} />

            </React.Fragment>
        );
    }
}


export default ControlPanel;
