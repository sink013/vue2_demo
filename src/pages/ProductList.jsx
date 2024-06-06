import { Button, Upload, message } from "antd";
import React, { useState } from "react";
import Cookies from "js-cookie";

// import { useNavigate } from "react-router-dom";
// import qs from "qs";
const ProductList = () => {
  const [imageUrl, setImageUrl] = useState("");
  // const navigate = useNavigate();
  const beforeUpload = (file) => {
    console.log(file);
    if (file.type === "image/jpeg" && file.type === "image/png") {
      message.error("Please select a picture to upload");
      return false;
    }
    if (file.size > 1024 * 1024 * 2) {
      message.error("The picture size can't be larger than 2M");
      return false;
    }
    return true;
  };
  const changeFn = ({ file }) => {
    if (file.status === "done") {
      console.log(file.response.data.src);
      message.success("Uploaded successfully");
      setImageUrl(file.response.data.src);
    }
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        showUploadList={false}
        action="http://62.234.30.177/adminapi/file/upload"
        headers={{
          "Authori-Zation": "Bearer " + Cookies.get("token"),
        }}
        name="file"
        data={{ pid: "" }}
        onChange={changeFn}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img
            src={"http://62.234.30.177/" + imageUrl}
            alt=""
            style={{
              width: "100%",
            }}
          />
        ) : (
          <div>+上传</div>
        )}
      </Upload>
      {/* <Button
        type="primary"
        onClick={() => {
          navigate("/admin/product/add_product");
        }}
      >
        添加
      </Button>
      <Button
        onClick={() => {
          //  navigate("/admin/product/add_product");
          //   navigate("/admin/product/add_product", {
          //     state: {
          //       title: "test",
          //     },
          //   });
          navigate({
            pathname: "/admin/product/add_product",
            search: qs.stringify({ title: "test" }),
          });
        }}
      >
        编辑
      </Button> */}
    </div>
  );
};

export default ProductList;
