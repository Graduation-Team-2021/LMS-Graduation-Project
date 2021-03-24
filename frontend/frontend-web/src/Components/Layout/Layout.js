import Aux from "../../hoc/Auxiliary";
import cls from './Layout.module.css'


const layout = (props) => (
    <Aux>
        <div> Toolbar, SideDrawer, Backdrop </div>
        <main className={cls.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout