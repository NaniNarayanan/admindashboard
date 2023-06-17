import '../../../src/pages/dashboard/featuredinfo.css'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

export default function FeaturedInfo(){
    return(
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Student Enrolement</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">5490</span>
                    <span className="featuredMoneyRate">
                        -16.93%<ArrowDownwardIcon className='featuredIcon Negative'/></span>
                </div>
                <span className="featuredSub">This Month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Student Enrolement</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">1480</span>
                    <span className="featuredMoneyRate">
                        +4.26%<ArrowUpwardIcon className='featuredIcon'/></span>
                </div>
                <span className="featuredSub">This Week</span>
            </div>
        </div>
    )
}