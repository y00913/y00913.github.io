---
comments: true
layout: post
title: 스프링부트 rabbitmq 오류 수정
date: 2024-06-28 00:42:00 +0900
category: error
---

외부 서버 도커에 rabbitMQ를 올린 후 스프링부트와 연결을 시도를 했는데 오류가 계속해서 발생했었다.... ```config``` 설정은 아래와 같이 해주었었다.
```java
@Slf4j
@Configuration
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {
    @Value("${host}")
    private String Host;
    @Value("${relayPort}")
    private int relayPort;
    @Value("${clientId}")
    private String clientId;
    @Value("${clientPw}")
    private String clientPw;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.setApplicationDestinationPrefixes("/pub")
                .enableStompBrokerRelay("/topic")
                .setRelayHost(Host)
                .setVirtualHost("/")
                .setRelayPort(relayPort)		// 61613
                .setClientLogin(clientId)		// guest
                .setClientPasscode(clientPw);	// guest
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }
}
```

이유는 도커에 올린 rabbitMQ에서 web stomp 플러그인 설정을 해주지 않아서였다 !! 아래 명령어를 차례로 입력해주면 아주 잘 연결된다.

```
# docker exec -it <rabbitMQ 컨테이너> /bin/bash
```
```
# rabbitmq-plugins enable rabbitmq_web_stomp
```
```
# rabbitmqctl stop
# rabbitmqctl start_app
# rabbitmqctl status
```
끝 !!