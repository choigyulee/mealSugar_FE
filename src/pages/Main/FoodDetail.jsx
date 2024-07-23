import styled from "styled-components";
import { useRef,useState } from "react";
import { BsImages } from "react-icons/bs";
import { TotalFoodToggle } from "../../components/TotalFoodToggle";
import { FoodToggle } from "../../components/FoodToggle";

// 전체 공간
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
// 공통 사용 



// 사진 업로드
const PictureContainer = styled.div`
    width: 300px;
    height: 174px;
    border-radius: 15px;
    border: 1px solid #F74A25;
    background: #FFF;
    margin-top:39px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const PictureIcon = styled(BsImages)`
    width: 60px;
    height: 60px;
    color: #F74A25;
    cursor: pointer;
`
const PictureText = styled.div`
    width: 140px;
    height: 44px;
    color: #F74A25;
    text-align: center;
    font-family: "Wavve PADO TTF";
    font-size: 20px;
    font-weight: 400;
    cursor: pointer;
`

export function FoodDetail(){
    const fileInputRef = useRef(null);
    const [file, setFile] = useState(null);

    const handleFileChange = event => {
        setFile(event.target.files[0]);
      };

    const triggerFileInput = () => {
        fileInputRef.current.click();
      };

    return(
        <Container>
            <TotalFoodToggle/>
            <FoodToggle/>
            <PictureContainer onClick={triggerFileInput}>
                <PictureIcon/>
                <PictureText>식단 인증 사진 업로드 하기 </PictureText>
            </PictureContainer>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
        </Container>
    )
};
