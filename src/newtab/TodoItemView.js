class TodoItemView extends React.Component {
    render() {
        const content = this.parseContent();
        return (<div>
                    {this.maybeRenderDailyIndicator()}
                    {this.parseContent()}
                </div>);
    }

    maybeRenderDailyIndicator() {
        let result;
        if (this.props.todo.date_string === "every day") {
            result = (<img className={"repeat"} src={"/img/repeat.svg"}/>);
        }
        return result;
    }

    // returns the index of the next word in the word array with a ')'
    locateClosingParenth(wordArray, openingIndex) {
        const rhSlice = wordArray.slice(openingIndex);
        for(let index = 0; index < rhSlice.length; index++) {
            let closeWord = rhSlice[index];
            if (closeWord[closeWord.length-1] === ")") {
                return index + openingIndex;
            }
        }
        return null;
    }

    // creates an array of index ranges representing opening and closing of parenths
    locateRangesForParenth(wordArray) {
        let hrefIndexRanges = [];
        wordArray.forEach((word, i) => {
            if (word[0] === "(" && i !== 0) {
                let urlCandidate = wordArray[i-1];
                if (this.isStringAUrl(urlCandidate)) {
                    // find index with ending ')'
                    let closeParen = this.locateClosingParenth(wordArray, i);
                    if (closeParen !== null) {
                        hrefIndexRanges.push([i,closeParen]);
                    }

                }
            }
        });
        return hrefIndexRanges;
    }

    // formats into an array of jsx items with spans and anchor html tags
    convertWordArrayIntoJsxArray(wordArray, hrefIndexRanges) {
        let jsx = [];
        let curIndex = 0;
        hrefIndexRanges.forEach((range, i) => {
            const startIndex = range[0];
            const endIndex = range[1];
            const text = wordArray.slice(curIndex,startIndex-1).join(" ");
            const section = <span key={curIndex}>{text}</span>;
            jsx.push(section);
            curIndex = startIndex-1;
            const url = wordArray[curIndex];
            curIndex++;
            let anchorText = wordArray.slice(curIndex,endIndex+1).join(" ");
            anchorText = anchorText.slice(1,anchorText.length-1);
            const anchor = <a href={url} key={curIndex}>{anchorText}</a>;
            jsx.push(anchor);
            curIndex = endIndex+1;
            // if its the last href, div the rest
            if (curIndex < wordArray.length && i < hrefIndexRanges.length) {
                const textEnd = wordArray.slice(curIndex,wordArray.length).join(" ");
                const sectionEnd = <span key={curIndex}>{textEnd}</span>;
                jsx.push(sectionEnd);
            }
        });
        return jsx;
    }

    parseContent() {
        let content = this.props.todo.content;
        // split by spaces
        let spaceSplit = content.split(" ");
        let hrefIndexRanges = this.locateRangesForParenth(spaceSplit);
        // format as jsx or just return string
        if (hrefIndexRanges.length === 0) {
            return content;
        } else {
            return this.convertWordArrayIntoJsxArray(spaceSplit, hrefIndexRanges);
        }
    }

    isStringAUrl(str) {
        const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(expression);
        return str.match(regex);
    }
}

module.exports = TodoItemView;