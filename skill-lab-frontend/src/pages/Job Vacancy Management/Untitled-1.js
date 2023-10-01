
<div>
<h2 className="add-header">Update career opportunity</h2>
    <div className="AddForm">
     
   { data&& <Form {...layout} name="deleteRequ" className="job-add-form" initialValues={data}  key={data._id}onFinish={onFinish} validateMessages={validateMessages}>

      <div className="add-form-items">
    <Form.Item
      name={['jobId']}
      label="Job ID"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['title']}
      label="Title"
      rules={[
        {
         required: true,
        },
      ]}
    >
    <Input />
      
    </Form.Item>
    <Form.Item name={[ 'salary']} 
            label="Salary"
            rules={[
                {
                 required: true,
                },
            ]}
            >
      <Input />
    </Form.Item>
    <Form.Item name={['description']}
     label="Description"
     rules={[
        {
         required: true,
        },
    ]}
     >
      <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
      <Button type="primary" htmlType="submit">
        Update
      </Button>
      
    </Form.Item>
    </div>
  </Form>
}
  </div>
  </div>
