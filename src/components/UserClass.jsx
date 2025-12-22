import React from 'react'
class UserClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {
                login: "Sachu",
                location: "Meerut Location",
                avatar_url: "https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg"
            }
        }
        console.log("child constructor", this.props.name);
    }
    async getUserInfo() {
        try {
            const data = await fetch('https://api.github.com/users/Sachin41');
            const json = await data.json();
            this.setState({
                userInfo: json
            })
            console.log(this.state)
        } catch (error) {
            console.error("Error while fetching user data: ", error);
        }
    }
    async componentDidMount() {
        this.getUserInfo();

        // Do Api calls here
        console.log("Child component did mount", this.props);

    }

    componentDidUpdate() {
        console.log("child compoent did update")
    }
    componentWillUnmount() {
        console.log("child component will unmount or destroy")

    }
    render() {
        const { login, location, avatar_url } = this.state.userInfo;
        // const {count, count1} = this.state;
        console.log("child render", this.props.name);
        return (
            <div className='profile-container flex justify-center item-center gap-20'>
                <div className="profile-left w-full overflow-hidden bg-white flex flex-col
                 items-center justify-center gap-[20px] rounded-md p-[30px] shadow-2xl">
                    <h1 className='!text-[28px] font-bold text-center text-[#1e1e1e]'>About Me</h1>
                    <img src={avatar_url} className='max-w-[180px] max-h-[180px] rounded-[50%]' alt="userImage" />
                    <h3 className='text-xl font-bold text-[#551A8B]'>Name:{login}</h3>
                    <p className="text-[16px] text-[#575757] font-medium">🧑‍💻😴</p>
                    <h2 className='!text-[20px] font-semibol'>Location: {location}</h2>
                </div>
                <div className="profile-right w-full overflow-hidden bg-white
                 justify-center item-center rounded-md p-[30px] shadow-2xl">
                    <h1 className='!text-[28px] font-bold text-center text-[#1e1e1e]'>My Skills</h1>
                    <ul className='my-4 text-[20px] font-semibold text-center'>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node</li>
                        <li>MongoDB</li>
                    </ul>
                </div>
                {/* <h2>UserClass page : {name}</h2> */}

            </div>
        )
    }
}
export default UserClass