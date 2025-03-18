# 포켓몬도감 만들기(개인플젝)
<p>사실 몇번이고 시도했었던 포켓몬도감 만들기.. 약 한달동안 빡세게 집중해서 뭐라도 완성해보기로 했다.</p>



## 사용한 스킬
<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Styled--components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>
</div>

## 주요 구현 사항
<ul>
  <li>Intersection Observer API를 이용한 무한스크롤</li>
  <li>styled-components를 사용해 스타일링</li>
  <li>react-router-dom을 이용해 페이지 라우팅</li>
</ul>

## 업데이트 구현 예정
<ul>
  <li>JS를 TS로 업데이트</li>
  <li>Redux대시 React Query로 1세대 포켓몬 api를 다량 요청후 캐싱하여 사용</li>
  <li>포켓몬 정렬처리</li>
  <li>필터 추가(세대별, 타입별)</li>
  <li>검색 자동완성</li>
  <li>뒤로가기 시 스크롤 위치 및 데이터 기억</li>
</ul>

<table>
  <thead>
    <tr>
      <th>버전</th>
      <th>날짜</th>
      <th>주요 업데이트</th>
    </tr>
  </thead>
  <tbody>
    <td>1.0</td>
    <td>25.03.18</td>
    <td>
      <ul>
        <li>포켓몬 정보 API 호출(axios)</li>
        <li>무한 스크롤 구현(Intersection Observer API)</li>
      </ul>
    </td>
  </tbody>
</table>