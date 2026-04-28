---
title: "[B-1] AI Act는 NLF 위에 AI 챕터를 얹은 것이다"
description: "EU AI Act(2024)가 NLF라는 40년 된 건물 위에 AI 층을 올린 구조를 추적한다. 무엇이 그대로이고, 무엇이 달라졌는가."
categories:
  - EU-AI-Act
  - NLF
  - AI Regulation
  - Product Safety
tags:
  - EU규제
  - AI_Act
  - NLF
  - CE마킹
  - 규제설계
  - 제품안전
last_modified_at: 2026-04-28T11:00:00+09:00
---

**— 새 법인가, 기존 법의 확장인가**

*Series B. EU AI Act: 새 법인가, 기존 법의 확장인가 | B-1

*이전 글: [A-5] 위험을 재는 저울 — NLF가 작동하는 숨은 엔진

*다음 글: [B-2] '고위험 AI'란 무엇인가: 리스크 평가의 논리*

> A 시리즈에서 해부한 NLF의 뼈대가 AI Act에 어떻게 이식되었는지 추적한다. 
> 새 건물이 아니라, 기존 건물에 새 층을 올린 이야기.

---

토스터와 챗봇은 닮은 점이 없어 보인다.

- 하나는 빵을 굽고, 다른 하나는 말을 한다. 
- 하나는 손에 잡히고, 다른 하나는 화면 속에만 있다. 
- 하나는 1920년대에 처음 등장했고, 다른 하나는 2020년대의 산물이다.

<br>

그런데 유럽에서 이 둘은 같은 체계 아래 놓인다. 

토스터에 붙는 CE 마크가, 고위험 AI 시스템에도 붙는다.[^1] 

같은 적합성 평가를 거치고, 같은 기술문서를 준비하고, 같은 시장감시를 받는다.

<br>

100년 차이가 나는 두 제품이 같은 규제 안에 들어간다. 어떻게 가능한가.

답은 하나다. EU는 AI를 위한 새 건물을 짓지 않았다. **40년 된 건물에 새 층을 올렸다.**

---

## 설계도를 재활용한 이유

2024년 7월, EU AI Act가 공포된다.[^2] 13장 113조, 13개 부속서. 세계 최초의 포괄적 AI 규제법이라는 수식어가 붙었다.

<br>
그런데 이 법을 꼼꼼히 읽으면 이상한 것을 발견한다. **핵심 개념들이 정의 없이 등장한다.**

"적합성 평가 절차(conformity assessment procedure)"가 Article 43에 나온다. 

그런데 적합성 평가가 무엇인지 이 법은 설명하지 않는다. 

"Notified Body"가 Article 33에 나온다. NB가 무엇인지도 설명하지 않는다. 

"시장감시(market surveillance)"가 Article 74에 나온다. 역시 정의 없다.[^3]

<br>


왜 그런가. **이미 다른 곳에 쓰여 있기 때문이다.**

NLF — A 시리즈에서 우리가 해부한 바로 그 체계.

AI Act는 NLF 위에 서 있다. 

토스터를 관리하던 같은 골격 위에, AI라는 새로운 층을 얹었다. 건물의 기초공사를 다시 할 필요가 없었다. 기초는 40년 동안 검증되었으니까.

---

## 다섯 개의 기둥은 그대로 서 있다

A 시리즈를 통해 우리가 확인한 NLF의 설계 원리 다섯 가지. AI Act에 그 원리가 고스란히 살아 있는지 대조해보자.

<br>

**첫째, 기술 중립.**

NLF는 "어떻게 만들라"가 아니라 "무엇을 달성하라"만 법에 썼다([A-1](https://houuya.github.io/eu%EC%A0%9C%ED%92%88%EC%95%88%EC%A0%84/nlf/ai%20regulation/product%20safety/A-1-why-europe-law-has-no-spec/)). 

AI Act도 마찬가지다. "파라미터 수 몇 억 개 이상"이라고 쓰지 않는다. 

대신 "정확성, 견고성, 사이버보안을 보장하라"고 쓴다.[^4] 

구체적인 수치는 법에 없다. 기술이 바뀌어도 법은 그대로 견딜 수 있도록.

**둘째, 표준 위임.**

NLF에서 CEN/CENELEC이 조화표준을 만들었듯([A-1](https://houuya.github.io/eu%EC%A0%9C%ED%92%88%EC%95%88%EC%A0%84/nlf/ai%20regulation/product%20safety/A-1-why-europe-law-has-no-spec/), [A-5](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-5-%EC%9C%84%ED%97%98%EC%9D%84-%EC%9E%AC%EB%8A%94-%EC%A0%80%EC%9A%B8/)), AI Act도 같은 방식을 쓴다. 

Article 40이 조화표준 준수추정을 명문화한다. 

CEN-CENELEC JTC 21이라는 전담 위원회가 AI 조화표준을 개발 중이다.[^5]

**셋째, 비례성.**

위험의 크기에 따라 규제 강도가 달라지는 원리([A-5](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-5-%EC%9C%84%ED%97%98%EC%9D%84-%EC%9E%AC%EB%8A%94-%EC%A0%80%EC%9A%B8/)). 

NLF에서 모듈 A~H이 위험에 비례했듯, AI Act는 4단계 피라미드로 이를 구현한다. 

금지, 고위험, 제한적 리스크, 최소 리스크. 다음 글(B-2)에서 상세히 다룬다.

**넷째, 사전+사후.**

NLF의 적합성 평가(사전)와 시장감시(사후) 이중 구조가 AI Act에도 그대로 있다. 

Article 43이 사전 적합성 평가를, Article 74-79가 사후 시장감시를 규정한다. 

[A-2](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-2-%EC%9D%B8%EC%A6%9D-%EB%AA%A8%EB%93%88(A~H)%EC%9D%80-%EA%B8%B0%EC%97%85-%EB%A7%9E%EC%B6%A4-%EB%A9%94%EB%89%B4%ED%8C%90%EC%9D%B4%EB%8B%A4/)에서 본 모듈과 [A-4](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-4-%EC%A0%9C%ED%92%88%EC%9D%B4-%ED%8C%94%EB%A6%B0-%EB%92%A4%EA%B0%80-%EB%8D%94-%EB%AC%B4%EC%84%AD%EB%8B%A4/)에서 본 시장감시가 AI에도 작동하는 것이다.

**다섯째, 경제적 운영자 책임.**

[A-4-1(Blue Guide)](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-4-1-Blue-Guide%EB%8A%94-%ED%95%B4%EC%84%A4%EC%84%9C%EC%9D%B8%EA%B0%80-%EC%84%A4%EA%B3%84%EB%8F%84%EC%9D%B8%EA%B0%80/)에서 확인한 제조사·수입업자·유통업자 의무 체계. 

AI Act도 공급자(Provider), 수입업자(Importer), 배포자(Distributor)에게 각각의 의무를 부여한다.[^6]

<br>

다섯 개의 기둥이 모두 서 있다.

건물이 같다. 

---

## 새 층에서 달라진 네 가지

그러나 AI는 토스터가 아니다. 
<br>
40년 된 건물에 새 층을 올리면서, 기존 설계로는 해결할 수 없는 문제 네 가지가 드러났다. AI Act는 이 네 가지에 대해 NLF를 확장한다.

### 1. 배치자(Deployer)라는 새 행위자

NLF 체계에서 제품이 시장에 출시되면, 이후 사용자는 규제 의무를 지지 않았다. 토스터를 산 사람에게 안전 의무가 없듯이.

AI는 다르다. 같은 AI 시스템이라도 **누가, 어디에, 어떻게 배치하느냐**에 따라 위험이 완전히 달라진다. 채용에 쓰면 고위험이고, 음악 추천에 쓰면 최소 리스크다.

그래서 AI Act는 **배치자(Deployer)** 라는 새로운 규제 대상을 만들었다.[^7] 

NLF 40년 역사에 없던 개념이다. 

> "자신의 권한 하에 AI 시스템을 전문적 맥락에서 사용하는 자." 

단순 소비자가 아니라, 업무에 AI를 투입하는 조직이나 사람.

배치자는 AI를 적절히 사용하고, 인간 감독을 유지하고, 사고를 보고해야 한다.

### 2. 사후 모니터링(PMS)의 의무화

NLF에서 사후 관리는 주로 시장감시기관(MSA)의 몫이었다([A-4](https://houuya.github.io/eu-product-safety/nlf/ai%20regulation/product%20safety/A-4-%EC%A0%9C%ED%92%88%EC%9D%B4-%ED%8C%94%EB%A6%B0-%EB%92%A4%EA%B0%80-%EB%8D%94-%EB%AC%B4%EC%84%AD%EB%8B%A4/)). 

제조사가 자발적으로 하는 것은 있었지만 체계적 의무는 약했다.

AI Act Article 72는 다르다. **공급자가 직접 사후 모니터링 계획을 수립하고 실행해야 한다.** 의료기기법(MDR)의 PMS 모델을 AI에 이식한 것이다.[^8]

왜 강화했나. 

>AI 시스템은 출시 후에도 변한다. 
>데이터가 바뀌고, 사용 패턴이 바뀌고, 성능이 변동한다.

토스터는 출시 후 물리적으로 변하지 않지만, AI는 **살아있는 제품**이다.

중대 사고 발생 시 15일 이내 보고 의무도 추가되었다(Article 73).

### 3. 기술 문서의 확장

NLF 기술문서에는 설계 사양, 제조 공정, 시험 결과가 담겼다.

AI Act의 기술문서(Article 11 + Annex IV)는 훨씬 방대하다. 

AI 시스템의 일반 설명뿐 아니라, **훈련·검증·테스트 데이터의 세부 사항**, 사이버보안 조치, 로그 기록 역량, 리스크 관리 시스템 전체가 문서화되어야 한다.[^9]

토스터의 기술문서가 설계도와 시험 성적서라면, AI의 기술문서는 그것에 더해 **훈련 과정의 일기장**까지 포함하는 셈이다.

### 4. 지속적 준수 의무

NLF 제품은 시장 출시 시점에 요건을 충족하면, 그 상태가 유지된다고 가정할 수 있었다. 

토스터의 회로는 스스로 바뀌지 않으니까.

AI는 다르다. 학습하고, 업데이트되고, 환경에 적응한다. 

출시 시점의 적합성이 6개월 후에도 유지된다고 보장할 수 없다.

그래서 AI Act는 **실질적 변경(Substantial Modification, Article 3(23))** 이라는 개념을 도입했다.[^10] 

출시 후 AI가 크게 바뀌면 적합성 평가를 다시 받아야 한다. 이 문제는 B-3에서 깊이 다룬다.

---

## NLF에서 AI Act로 — 조항 대응표

A 시리즈에서 다룬 개념들이 AI Act의 어디에 대응하는지 한눈에 보자.

```
NLF / Blue Guide                    AI Act
─────────────────────────────────────────────
필수요구사항 (법령 Annex)         ←→  Art.8-15 고위험 AI 요건
조화표준 (OJEU 참조)              ←→  Art.40 조화표준 + 준수추정
적합성 평가 모듈                   ←→  Art.43 적합성 평가 절차
  Module A (내부관리)                  → 내부평가(자체 적합성)
  Module B+D/H (NB 참여)              → 생체인식 등: 제3자 NB 심사
EU DoC (자기 선언)                ←→  Art.47 EU 적합성 선언
기술문서                          ←→  Art.11 + Annex IV
CE 마킹                           ←→  Art.49 CE 마킹
수권대리인                         ←→  Art.22 수권대리인
수입업자                           ←→  Art.23 수입업자
유통업자                           ←→  Art.24 배포자
Notified Body                     ←→  Art.33-36 NB
인정(Accreditation)                ←→  Art.33 (Reg 765/2008 준용)
시장감시(Reg 2019/1020)           ←→  Art.74-79 + Reg 2019/1020 준용
RAPEX/Safety Gate                 ←→  Art.79 중대 리스크 통보
─────────────────────────────────────────────
[NLF에 없음]                       →  Art.26 배치자(Deployer) — 신설
[NLF에 없음]                       →  Art.72 사후모니터링(PMS) — 강화
[NLF에 없음]                       →  Art.51-55 GPAI — 신설
[NLF에 없음]                       →  Art.64 AI Office — 신설
```

왼쪽 열은 A 시리즈 전체의 요약이다. 오른쪽 열은 B 시리즈의 지도다.

---

## [필자 분석]

AI Act를 "세계 최초의 AI 법"이라고 소개하는 것은 맞지만, 절반의 진실이다. **AI Act는 NLF라는 40년 된 건물의 새 층이다.** 새 건물이 아니다.

이 구별이 왜 중요한가. AI Act 113개 조문 중, 순수하게 AI 고유 논리만으로 설계된 조항은 생각보다 적다. 배치자(Art.26), GPAI(Art.51-55), AI Office(Art.64), 사후 모니터링(Art.72) 정도다. 나머지 — 적합성 평가, CE 마킹, 기술문서, NB, 시장감시, 경제적 운영자 의무 — 는 모두 NLF에서 가져온 것이다.

EU 집행위원회의 공식 웨비나(2024.5.30)에서 DG CNECT의 Dr. Tatjana Evas가 명시적으로 밝혔다. "AI Act는 NLF(New Legislative Framework) 체계의 일부다."[^11]

<br>

**한국 규제 담당자에게 주는 시사점이 여기 있다.** 

한국 AI 기본법(2026.7 시행)은 NLF 같은 기반 체계가 미흡하며, AI법만 단독으로 설계되었나?

조화표준 체계, 적합성 평가 모듈, NB 체계, Reg 2019/1020 같은 시장감시 일반법은??

기초 없이 새 층만 올린 셈인가?

건물의 새 층은 기초가 튼튼해야 올라간다. 

EU가 AI Act를 빠르게 구현할 수 있는 이유는, 40년간 기초를 다져왔기 때문이다. 

한국이 EU 수준의 AI **규제**를 원한다면, AI법 자체보다 **그 아래의 기반 체계**부터 설계해야 하지 않을까?

---

## 마무리 — 다음 질문

건물의 구조를 확인했다. 다섯 개의 기둥이 서 있고, 네 개의 새 방이 추가되었다.

그런데 이 건물에서 가장 중요한 방이 아직 열리지 않았다. NLF가 비례성 원칙으로 작동한다면, AI Act는 무엇을 기준으로 "이 AI는 위험하다"고 판단하는가.

4단계 피라미드의 논리. 그 꼭대기에 놓인 **금지 AI 8가지**와, 그 바로 아래 놓인 **고위험 AI의 정의**.

다음 글에서 그 문을 연다.

---

*이전 글: [A-5] 위험을 재는 저울 — NLF가 작동하는 숨은 엔진*
*다음 글: [B-2] '고위험 AI'란 무엇인가: 리스크 평가의 논리*

---

주석 :
[^1]: EU AI Act Article 49. 고위험 AI 시스템에 CE 마킹 부착 의무.
[^2]: Regulation (EU) 2024/1689, OJ L 2024-07-12. 2024년 8월 1일 발효, 단계적 시행.
[^3]: AI Act는 NLF 개념을 정의 없이 참조. Blue Guide 2022 (OJ C 247)가 이 개념들의 실질적 해설서. 위키 분석 [[NLF-Blue-Guide-AI-Act-연계분석]] 참조.
[^4]: AI Act Article 15. 정확성(Accuracy), 견고성(Robustness), 사이버보안(Cybersecurity) 요건.
[^5]: AI Act Article 40. CEN-CENELEC JTC 21이 AI 조화표준 개발. 최초 공개심의 표준 prEN 18286 (AI QMS, 2025.10).
[^6]: AI Act Article 16(공급자), Article 23(수입업자), Article 24(배포자).
[^7]: AI Act Article 3(4) + Article 26. Deployer = "자신의 권한 하에 전문적 맥락에서 AI 시스템을 사용하는 자연인 또는 법인."
[^8]: AI Act Article 72. 의료기기 규정(MDR, Reg 2017/745)의 Post-Market Surveillance 모델을 AI에 적용.
[^9]: AI Act Article 11 + Annex IV. 기술문서에 훈련·검증·테스트 데이터 세부사항, 사이버보안 조치, 로그 역량 등 포함.
[^10]: AI Act Article 3(23). Substantial Modification = "시장 출시 또는 서비스 투입 후 AI 시스템의 변경으로서, 초기 적합성 평가에 반영되지 않았거나 초기 적합성에 영향을 미칠 수 있는 것."
[^11]: DG CNECT / European AI Office 웨비나 (2024.05.30), "Risk management logic of the AI Act and related standards." Dr. Tatjana Evas 발표.
