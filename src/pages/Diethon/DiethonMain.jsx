import styled from "styled-components";
import Ranking from "../../components/Diethon/Ranking";
import Diet from "../../components/Diethon/Diet";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import getDiethonMain from "../../APIs/get/getDiethonMain";
import { useState, useEffect } from "react";

const Container =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Introduce = styled.div`
  width: 319px;
  height: 30px;
  color: #000;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 25px;
  font-weight: 400;
  align-self: flex-start;
  margin-top: 25px;
  margin-left: 34px;
`

const ColorWord = styled.span`
  color: #6A0DAD;
`

const Register = styled.div`
  width: 200px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-right: 25px;
  margin-bottom: 10px;
  margin-top: 5px;
  cursor: pointer;
`
const RegisterText = styled.div`
  width: 173px;
  color: #9370DB;
  text-align: right;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 18px;
  font-weight: 400;
`
const RegisterIcon = styled(BsArrowRight)`
  width: 15px;
  height: 15px;
  color: #9370DB;
  padding-left: 3px;
`

export default function Diethon(){
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    first: null,
    second: null,
    third: null,
    diets: []
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchDiethonInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getDiethonMain();
      if (response.first && response.second && response.third) {
        setInputData(response);
        setIsLoading(false);
      } else {
        // 데이터가 불완전한 경우 isLoading을 true로 유지
        setInputData({
          first: null,
          second: null,
          third: null,
          diets: response.diets || []
        });
      }
      console.log(response)
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      setInputData({ first: null, second: null, third: null, diets: [] });
      setIsLoading(false);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    fetchDiethonInfo();
  }, []);

  return(
      <Container>
          <Ranking 
            first={inputData.first} 
            second={inputData.second} 
            third={inputData.third}
            isLoading={isLoading} 
          />
          <Introduce><ColorWord>{inputData.diets.length}개</ColorWord>의 식단이 등록되었어요</Introduce>
          <Register onClick={() => navigate('/foodregistration')}><RegisterText>나만의 식단 등록하러 가기</RegisterText><RegisterIcon/>
          </Register>
          <Diet diets={inputData.diets}/>
      </Container>
  )

}