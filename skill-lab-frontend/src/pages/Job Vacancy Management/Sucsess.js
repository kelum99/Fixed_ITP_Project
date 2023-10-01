import { Result, Button } from 'antd';

function Sucsess(){

    return(
<Result
    status="success"
    title="Successfully Submitted the Application"
    subTitle="We will sent you some important e-mails. keep touch with your e-mail"
    extra={[
      <Button type="primary" key="console">
        Go Home Page
      </Button>,
      <Button key="buy">View Submission</Button>,
    ]}
  />
    );
}

export default Sucsess;