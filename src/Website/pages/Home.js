import Block1 from '../component/Block1';
import Block2 from '../component/Block2';
import Block3 from '../component/Block3';
import Block4 from '../component/Block4';

function Home() {
    return (
        <div className="Home">
            <Block1/>
            <Block2 />
            <Block3 />
            <Block4 />
        </div>
    );
}

export default Home;