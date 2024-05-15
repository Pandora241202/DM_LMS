import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  connectServer(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .heart {
    width: 100px;
    height: 90px;
    position: relative;
  }
  .heart:before, .heart:after {
    content: '';
    position: absolute;
    width: 500px;
    height: 700px;
    background-color: red;
    transform-origin: 0 100%;
  }
  .heart:before {
    left: 77px;
    top: +207px;
    transform: rotate(-45deg);
    border-radius: 500px 500px 100px 0;
  }
  .heart:after {
    left: -276px;
    top: -147px;
    transform: rotate(45deg);
    border-radius: 500px 500px 0 100px;

  }
  .inner-heart {
    width: 300px;
    height: 90px;
    position: absolute;
    top: 300px;
    left: -75px;
    z-index: 1;
    font-size: 3cm;
    text-align: center;
  }
  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
  }
  .blinking-text{
    animation: blink 2s infinite;
  }

</style>
</head>
<body>

<div class="heart">
  <div class="inner-heart blinking-text">I LOVE YOU</div>
</div>

</body>
</html>
`;
  }
}
