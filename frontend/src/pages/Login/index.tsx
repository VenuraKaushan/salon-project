import { Group } from "@mantine/core";
import ClientLogin from "../../components/clientLogin";
import AdminLogin from "../../components/adminLogin";
import backgroundimg from "../../assets/backgroundimg.jpg"
import { forwardRef } from "react";
import { getHotkeyHandler } from '@mantine/hooks';


const LoginPage = forwardRef<HTMLInputElement>((props,ref) => {

  return (
    <div style={{ height: "100vh" , backgroundImage:`url(${backgroundimg})`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'  }} ref={ref}>
      <Group position="center"  spacing={100}  >
          <AdminLogin />
          {/* <ClientLogin /> */}
          {/* onKeyDown={getHotkeyHandler([

          ])} */}
      </Group>
    </div>
  );
});

export default LoginPage;
