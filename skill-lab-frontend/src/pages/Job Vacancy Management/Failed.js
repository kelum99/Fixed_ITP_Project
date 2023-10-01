import { Result, Button } from 'antd';

function Sucsess(){

    return(
      <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong !  Try again later"
      extra={<Button type="primary" id="error-Btn">Back Home</Button>}
    />
    );
}

export default Sucsess;