import { Drawer } from "antd";

const DrawerComponent = ({ placement ="right",children, isOpen = false, ...rests}) => {
    return (
        <Drawer
            placement={placement}
            open={isOpen}
            {...rests}
        >
            {children}
        </Drawer>
    )
}
export default DrawerComponent;