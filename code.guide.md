## Structure

기존 express의 기능 별로 분리 (controllers, services..) 보다는 <br>
도메인 별로 분리가 가독성이 좋다고 판단이 들어 api/도메인 별로 분리 <br>
nest.js의 모듈 시스템을 모티브 함

- api
  - domain
    - dto :: Data Transfer Object
    - controller.ts :: request, response 와 exception 을 핸들링
    - repository.ts :: abstract.repository에 없는 기능이 필요 할 시 기능 추가
    - routes.ts :: 라우팅과 미들웨어 담당
    - service.ts :: Repository 와 Controller 가운데 layer 이자 비지니스 로직 담당
- entity :: Database 테이블에 매칭 되는 entity 파일
- libs
  - common
    - config/env.ts :: .env 파일을 핸들링 하는 파일 nest.js의 ConfigModule을 모티브
    - database
    - abstract.entity.ts :: entity의 base class
    - abstract.repository.ts :: typeorm의 base repository > 기본적인 crud 지원
    - structure :: 구조체 > 보통 사용하는 types 혹은 interfaces 와 유사한 포지션
- middleware
  - error.middleware.ts :: 에러 핸들링
  - validation.middleware.ts :: req의 인자 값을 보호 하기 위한 middleware
- app.ts :: 앱의 미들웨어와 라우팅을 setting
- data-source.ts :: db connection 과 data-seeding을 담당
- index.ts :: end point
