---
comments: true
layout: post
title: cannot deserialize from object value (no delegate- or property-based creator) 해결
date: 2024-06-20 00:42:00 +0900
category: error
---

cannot deserialize from object value (no delegate- or property-based creator) 라는 오류가 나타났다.

```post```를 통해 데이터를 받아오는 객체에 빈 생성자가 없어서 발생한 오류이다. ```@NoArgsConstructor``` 어노테이션을 추가해주면 해결할 수 있다.