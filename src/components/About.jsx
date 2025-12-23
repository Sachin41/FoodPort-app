import React from 'react'
// import User from './User';
import UserClass from './UserClass';
import burgerImage from "../assets/Images/burger-image.png";
class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showUser: false
        }
        console.log("Parent Construtor", props);
    }
    componentDidMount() {
        // Do Api calls here
        console.log("Parent component did mount");

    }
    async componentDidUpdate() {
        console.log("compoent did update")
    }
    componentWillUnmount() {
        console.log("component will unmount or destroy")

    }
    toggleUser = () => {
        this.setState({ showUser: !this.state.showUser })
    }
    render() {
        console.log("component render method called");
        return (
            <div className='about-container w-[85%]'>
                <div className="text-center py-8">
                    <button className='text-white !bg-[#d97919] !text-[1.2rem] font-semibold py-2.5 px-5 border-none outline-none rounded-[5px] cursor-pointer hover:!bg-[darkgreen] transition-all 0.3s ease-in-out' onClickCapture={this.toggleUser}>
                        {this.state.showUser ? 'Hide Profile' : 'Show Profile'}
                    </button>
                </div>
                {/* <User name={'sachin'} /> */}
                {this.state.showUser && <UserClass />}
                <div className="about flex justify-between item-center gap-20 w-full py-10">
                    <div className="about-left">
                        <h1 className='!text-[60px] text-[#494949] font-bold'>
                            Welcome to <br /> The world of <br />
                            <span className='text-white bg-[#d97919] rounded-[15px] 
                            px-[15px] py-[5px] !leading-[100px]'>Tasty & Fresh Food</span>
                        </h1>
                        <h4 className='!text-[22px] mt-[10px] italic font-semibold'>
                            "Better you will feel if you eat a <span className='text-[#273a6e]'> Food</span><span className='text-[#9bc65f]'> Port</span> healthy
                            meal"
                        </h4>
                    </div>
                    <div className="about-right">
                        <img src={burgerImage} alt="burgerImage" />
                    </div>
                </div>
            </div>
        )

    }
}
export default About;
