---
comments: true
layout: post
title: query did not return a unique result 해결
date: 2024-07-03 13:53:00 +0900
category: error
---

JPA를 통해 findByid를 사용하던 중 오류가 발생했다. 
```query did not return a unique result: 3```
이는 repository에서 조회 결과는 3개인데 Class로 받아 담을 수 없기에 발생한다.
List<Class\>로 받게 되면 오류를 해결할 수 있다.
