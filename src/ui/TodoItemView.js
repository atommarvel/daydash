class TodoItemView extends React.Component {
    render() {
        const content = this.parseContent();
        return <div>{content}</div>
    }

    parseContent() {
        let content = this.props.todo.content;
        // split by spaces
        let spaceSplit = content.split(" ");
        // if any index starts with ( then check on the index before
        let hrefIndexRanges = [];
        spaceSplit.forEach((word, i) => {
            if (word[0] === "(" && i !== 0) {
                let urlCandidate = spaceSplit[i-1];
                if (this.isStringAUrl(urlCandidate)) {
                    // find index with ending
                    let closeParen = null;
                    const rhSlice = spaceSplit.slice(i);
                    for(let j = 0; j < rhSlice.length; j++) {
                        console.log('looking for end');
                        let closeWord = rhSlice[j];
                        if (closeWord[closeWord.length-1] === ")") {
                            closeParen = j+i;
                            break;
                        }
                    }
                    if (closeParen !== null) {
                        hrefIndexRanges.push([i,closeParen]);
                    }

                }
            }
        });
        // format as jsx
        let jsx = [];
        let curIndex = 0;
        if (hrefIndexRanges.length === 0) {
            return content;
        } else {
            hrefIndexRanges.forEach((range, i) => {
                const startIndex = range[0];
                const endIndex = range[1];
                const text = spaceSplit.slice(curIndex,startIndex-1).join(" ");
                const section = <span>{text}</span>;
                jsx.push(section);
                curIndex = startIndex-1;
                const url = spaceSplit[curIndex];
                console.log(url);
                curIndex++;
                const href = <a href={url}>{spaceSplit.slice(curIndex,endIndex+1).join(" ")}</a>;
                jsx.push(href);
                curIndex = endIndex+1;
                // if its the last href, div the rest
                if (curIndex < spaceSplit.length && i < hrefIndexRanges.length) {
                    const textEnd = spaceSplit.slice(curIndex,spaceSplit.length).join(" ");
                    const sectionEnd = <span>{textEnd}</span>;
                    jsx.push(sectionEnd);
                }
            });
            return jsx;
        }
    }

    isStringAUrl(str) {
        const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        const regex = new RegExp(expression);
        return str.match(regex);
    }
}

module.exports = TodoItemView;