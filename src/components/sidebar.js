import "../../src/style/sidebar.css"
function Sidebar() {

    return <div id="sidebarmain">
        <input type="checkbox" id="check" />

        <header>
            <label htmlFor="check">
                <i className="fas fa-bars" id="sidebar_btn"></i>
            </label>
        </header>

        <div className="mobile_nav">
            <div className="nav_bar">
                <img src="1.png" className="mobile_profile_image" alt="" />
                <i className="fa fa-bars nav_btn"></i>
            </div>
            <div className="mobile_nav_items">
                <a href="#"><i class="fa-solid fa-book"></i><span>Dashboard</span></a>
                <a href="#"><i className="fas fa-cogs"></i><span>Components</span></a>
                <a href="#"><i className="fas fa-table"></i><span>Tables</span></a>
                <a href="#"><i className="fas fa-th"></i><span>Forms</span></a>
                <a href="#"><i className="fas fa-info-circle"></i><span>About</span></a>
                <a href="#"><i className="fas fa-sliders-h"></i><span>Settings</span></a>
            </div>
        </div>

        <div className="sidebar">

            <div className="profile_info">
                <img src="https://i.imgur.com/iQpdHb2.jpg" className="profile_image" alt="" />
                <h4>Williamson</h4>
            </div>
           
            <a href="#"> <i class="fa-solid fa-book"></i><span>Courses</span></a>
            <a href="#"><i className="fas fa-cogs"></i><span>Components</span></a>
            <a href="#"><i className="fas fa-table"></i><span>Tables</span></a>
            <a href="#"><i className="fas fa-th"></i><span>Forms</span></a>
            <a href="#"><i className="fas fa-info-circle"></i><span>About</span></a>
            <a href="#"><i className="fas fa-sliders-h"></i><span>Settings</span></a>
        </div>



    </div>

}
export default Sidebar;