import { useEffect, useState, useRef } from 'react';
import Message from './Message/Message';
import moment from 'moment';
import SearchBar from './SearchBar/SearchBar'
import Compose from './Compose/Compose'
import cls from './MessageWindow.module.css';

const MY_USER_ID = 'apple';

export default function MessageList(props) {
    const [messages, setMessages] = useState([])
    const [searchVis, setSearchVis] = useState({ showSearch: false });
    //////////////////////////////////////////////////////////////////////////////////////
    var tempMessages1 = [
        {
            id: 1,
            author: 'apple',
            message: 'Definitely looks like everyone is affected',
            timestamp: new Date().getTime()
        },
        {
            id: 2,
            author: 'orange',
            message: 'They literally have to have one of each because you want to see benchmarks and builds by them.',
            timestamp: new Date().getTime()
        },
        {
            id: 3,
            author: 'orange',
            message: 'And they`ve had a lot of those for a long time. Only the 30 series they`ve had recently, because y`know, that`s when they came out.',
            timestamp: new Date().getTime()
        },
        {
            id: 4,
            author: 'apple',
            message: 'They`ve had some but remember they have direct access to manufacturers. They can place orders in ways we don`t have access to.',
            timestamp: new Date().getTime()
        },
        {
            id: 5,
            author: 'apple',
            message: 'That`s why they`re doing the Verified Actual Gamer program.',
            timestamp: new Date().getTime()
        },
        {
            id: 6,
            author: 'apple',
            message: 'Plus it`s easy to be mad at the reviewers for having piles but if they were all given away it wouldn`t make a dent anyway. Points to LMG for trying to distribute though',
            timestamp: new Date().getTime()
        },
        {
            id: 7,
            author: 'orange',
            message: 'Linus talked about it on the WAN show last week and also the 2 weeks before that. Its basically where they partner up with manufacturers to get a ton of stock on gaming hardware, then build a program that verified that a buyer is an actual gamer, then sell them the stuff at or close to MSRP. I dont remember the list of partners so far, but its lengthy from what i remember.',
            timestamp: new Date().getTime()
        },
        {
            id: 8,
            author: 'orange',
            message: 'Damn thats actually pretty cool',
            timestamp: new Date().getTime()
        },
        {
            id: 9,
            author: 'apple',
            message: 'How would they know though?',
            timestamp: new Date().getTime()
        },
        {
            id: 10,
            author: 'orange',
            message: 'Any update on this? There was a community post on youtube a couple days ago I think. I don`t really watch the WAN show, so do you know when this might be rolling out?',
            timestamp: new Date().getTime()
        }
    ]
    /////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        getMessages();
    }, [])
    //////////////////////////////////////////////////////////////////////////////////////
    const toggleSearch = () => {
        setSearchVis({ showSearch: !searchVis.showSearch })
    }

    let searchbb = null;
    if (searchVis.showSearch) {
        searchbb = <SearchBar />;
    }

    //////////////////////////////////////////////////////////////////////////////////////
    const inputFile = useRef(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
      }
    //////////////////////////////////////////////////////////////////////////////////  
    const [messIn, setMess] = useState({ text: '' })
    function handleInputChanged(event) {
        setMess({
            text: event.target.value
        });
    }

    function handleButtonClicked() {
        if (messIn.text === '') {
            return 0
        }
        var joined = messages.concat({
            id: messages.length,
            author: 'apple',
            message: messIn.text,
            timestamp: new Date().getTime()
        });
        setMessages([...joined])
        setMess({ text: '' })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleButtonClicked()
        }
    }
    /////////////////////////////////////////////////////////////////////////////////

    const getMessages = () => {
        setMessages([...tempMessages1])
    }

    const renderMessages = () => {
        let i = 0;
        let messageCount = messages.length;
        let tempMessages = [];

        while (i < messageCount) {
            let previous = messages[i - 1];
            let current = messages[i];
            let next = messages[i + 1];
            let isMine = current.author === MY_USER_ID;
            let currentMoment = moment(current.timestamp);
            let prevBySameAuthor = false;
            let nextBySameAuthor = false;
            let startsSequence = true;
            let endsSequence = true;
            let showTimestamp = true;

            if (previous) {
                let previousMoment = moment(previous.timestamp);
                let previousDuration = moment.duration(currentMoment.diff(previousMoment));
                prevBySameAuthor = previous.author === current.author;

                if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                    startsSequence = false;
                }

                if (previousDuration.as('hours') < 1) {
                    showTimestamp = false;
                }
            }

            if (next) {
                let nextMoment = moment(next.timestamp);
                let nextDuration = moment.duration(nextMoment.diff(currentMoment));
                nextBySameAuthor = next.author === current.author;

                if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                    endsSequence = false;
                }
            }

            tempMessages.push(
                <Message
                    key={i}
                    isMine={isMine}
                    startsSequence={startsSequence}
                    endsSequence={endsSequence}
                    showTimestamp={showTimestamp}
                    data={current}
                />
            );

            // Proceed to the next message.
            i += 1;
        }

        return tempMessages;
    }

    return (
        <div className={cls.list}>
            <div className={cls.title}>
                Orange
                <button className={cls.search}>
                    <i><img src="/settings_black.png" width="20" height="20" alt="options" /></i>
                </button>
                <button className={cls.search} onClick={toggleSearch}>
                    <i><img src="/Search_Icon.svg" width="20" height="20" alt="search button" /></i>
                </button>
                <button className={cls.search}>
                    <i><img src="/video_call_black.png" width="20" height="20" alt="video call button" /></i>
                </button>
                <button className={cls.search}>
                    <i><img src="/call_black.png" width="20" height="20" alt="call button" /></i>
                </button>
            </div>
            {searchbb}
            <div className={cls.container}>{renderMessages()}</div>
            <Compose value={messIn.text} onChange={handleInputChanged} onKeyDown={handleKeyDown} rightItems={[
                <button className={cls.search} key="voice"><i><img src="/voice.png" width="20" height="20" alt="voice message" /></i></button>,
                <button className={cls.search} key="photo" onClick={onButtonClick}><i><img src="/photo.png" width="20" height="20" alt="photo" /></i></button>,
                <button className={cls.search} key="attachment" onClick={onButtonClick}><i><img src="/attachment.png" width="20" height="20" alt="attachment" /></i></button>,
                <button className={cls.search} key="send" onClick={handleButtonClicked}><i><img src="/send.png" width="20" height="20" alt="send" /></i></button>,
            ]}><input type='file' id='file' ref={inputFile} style={{ display: 'none' }} onChange={onFileChange} /></Compose>
        </div>
    );
}