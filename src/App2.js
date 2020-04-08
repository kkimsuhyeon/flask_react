import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';


import './style.css';
import './reset.css';

function range(start, end) {
    let arr = [];
    let length = end - start;
    for (let i = 0; i <= length; i++) {
        arr[i] = start;
        start++;
    }
    return arr;
}


const App2 = () => {

    const [password, setPassword] = useState("")
    const [backPassword, setBackPassword] = useState("")

    const [visible, setVisible] = useState("")
    const [unique, setUnique] = useState("!^*()_+-")

    const [num, setNum] = useState(16)

    const Numbers = range(8, 40) // 최소 8글자 최대 40글자
    const selectList = Numbers.map((number, index) => {
        return <option key={index}>{number}</option> });


    const handleCopy = (e) => {
        if (e.target.id === 'btn1') {
            const copyText = document.getElementById("plaintext");
            copyText.select();
            document.execCommand("Copy");
        }
        else if(e.target.id === 'btn2'){
            const copyText = document.getElementById("Encrypted");
            copyText.select();
            document.execCommand("Copy");
        }
    }

    const onChange =(e) => {
        if(e.target.id === "plaintext"){
            setPassword(e.target.value)
        } else if(e.target.id === "Encrypted"){
            setBackPassword(e.target.value)
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === "plaintext") {
                if(password) {
                    axios.post("/fore", {"password": password}).then(res => setBackPassword(res.data.result))
                } else if(!password){
                    alert("암호화 할 비밀번호를 입력해주세요")
                }
            } else if (e.target.id === "Encrypted") {
                if(backPassword){
                    axios.post("/back", {"password":backPassword}).then(res => setPassword(res.data.result))
                } else if(!backPassword){
                    alert("암호화 된 비밀번호를 입력해주세요")
                }
            }
        }
    }

    const handlePasswordSubmit = () => {
        if(password){
            axios.post("/fore", {"password": password}).then(res => setBackPassword(res.data.result))
        } else if(backPassword){
            axios.post("/back", {"password":backPassword}).then(res => setPassword(res.data.result))
        }
    }

    const handleMakePassword = () => {
        if(!document.getElementById("Encrypted").value){
            setBackPassword("")
        } else{
            console.log(document.getElementById("plaintext").value)
            setBackPassword("")
            setPassword("")
        }
        axios.post("/password", {"number":num, "punc":unique}).then(res => setPassword(res.data.result))
    }

    const handleInit = () => {
        setPassword("")
        setBackPassword("")
    }

    const handleunique = (e) => {
        setUnique(e.target.value)
    }

    const handleNum = (e) => {
        setNum(e.target.value)
    }

    const handleOptionInit =() => {
        setUnique("!^*()_+-")
        setNum(16)
    }

    useEffect(() => {
        if(password === "error"){
            alert("복호화 할 수 없는 비밀번호 입니다.")
            setBackPassword("")
            setPassword("")
        }
        console.log("effect")
    }, [password])

    return(
        <Fragment>
            <div className="pw">
                <input type="text" className="input-text" id={"plaintext"} placeholder="Plaintext Passord"
                value={password ? password : ""} onChange={onChange} onKeyPress={onKeyPress} />
                <button type={"button"} id={"btn1"} onClick={handleCopy}>Copy</button>
                <input type="text" className="input-text" id={"Encrypted"} placeholder="Encrypted Password"
                value={backPassword} onChange={onChange} onKeyPress={onKeyPress} />
                <button type="button" id="btn2" onClick={handleCopy}>Copy</button>
                <button type="button" id="create" onClick = {handleMakePassword}>Passoword Generate</button>
                <button type={"button"} id={"secret"} onClick = {handlePasswordSubmit}>Encrypted/Decrypt</button>
                <button id="del" onClick = {handleInit}>clear</button>
            </div>
            <div className={"icon"}>
                <i className={"fas fa-plus"} id={"plus"} onClick={() => setVisible(!visible)}></i>
                <span onClick={() => setVisible(!visible)}>option</span>
                <div>{ (visible) &&
                    (<>
                        특수문자 : <input type="text" value={unique} onChange={handleunique}/><br/>
                        글자수 : <select value={num} onChange={handleNum}>{selectList}</select><br/>
                        <button onClick={handleOptionInit}>기본값으로 되돌리기(16글자, 특수문자 모두 포함)</button>
                    </>) }
                </div>
            </div>
        </Fragment>
    );
}

export default App2
