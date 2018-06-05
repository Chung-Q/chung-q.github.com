$(document).ready(function(){
            var parser = math.parser();

            var valueData = '0';
			var coloredData = new Array();	// 색 변환 후의 문자열 저장
			
			$('#history-clear').click(function(e) {
				$('#history').text('');
			});
			
			var check = $("input[type='checkbox']");
				check.click(function(){
				$("p").toggle();
			});
			
            $('.key').each(function(index, key){       
                $(this).click(function(e){
                    if(valueData == '0') valueData = '';

                    if($(this).text() == 'Enter')
                    {
                        try
                        {
                            valueData = parser.eval(valueData).toString();
                            var tokens = valueData.split(' ');
                            if(tokens[0] == 'function')
                            {
                                valueData = tokens[0];
                            }
                            $.each(coloredData, function(index, item) {
								$('#history').append(item);
							});
							$('#history').append('<br>' + '= ' + valueData.fontcolor("Dodgerblue") + '<br>' );								
							$('#history').scrollTop($('#history').get(0).scrollHeight);	// 스크롤이 항상 아래로 고정
							valueData = '0';
							coloredData = new Array();
							$('#input').text('');	// 모두 초기화
                        }
                        catch (e)
                        {
                            valueData = '0';
							coloredData = new Array();
							$('#input').text('');
                            if(valueData != 'function')
                            {
                                $('#history').append(e + '<br>');
                            }
                        }               
                    }
                    else
                    {
                        if($(this).text() == 'CL')
                        {
							if($('#how-to-use').css('visibility') == 'visible') {
								$('#how-to-use').css('visibility', 'hidden');
							}
                            valueData = '0';
							coloredData = new Array();
                            $('#input').text('');	// 모두 초기화
                        }
						else if($(this).text() == '←')
						{
							valueData = valueData.slice(0,-1);	// 마지막 데이터 삭제
							coloredData.pop();	// 배열의 마지막 삭제
							$('#input').text('');	// input 비워주고
							$.each(coloredData, function(index, item) {
								$('#input').append(item);
							});	// 배열의 나머지로 다시 채워줌
						}
                        else
                        {   
							// 누르는 버튼 별로 입력되는 글씨의 색을 바꿔줌
							// function-key: 빨, arithmetic-key+etc-key: 금, symbol-key: 초, parenthesis-key: 보
							if($(this).hasClass('function-key')) {
								coloredData.push($(this).text().fontcolor("red"));
								// 함수 버튼 누르면 사용법, 예시가 화면에 나타남
								switch ($(this).text()) {
								
								case 'sin': 
									$('#how-to-use').text('sin(x) -> 예) sin(10)=-0.54402111...');
									break;
								case 'cos':
									$('#how-to-use').text('cos(x) -> 예) cos(10)=-0.83907152...');
									break;	
								case 'tan':
									$('#how-to-use').text('tan(x) -> 예) tan(10)=0.64836082...');
									break;	
								case 'dot':
									$('#how-to-use').text('벡터내적 -> 예) x=[2,3] y=[3,2]일 때 dot(x,y)=12');
									break;	
								case 'cross':
									$('#how-to-use').text('벡터외적 -> 예) x=[1,2,3] y=[3,2,1]일 때 cross(x,y)=[-4,8,-4]');
									break;
								case 'det':
									$('#how-to-use').text('행렬식 -> 예) x=[1,2;3,4]일 때 det(x)=-2');
									break;	
								case 'inv':
									$('#how-to-use').text('역행렬 -> 예) x=[1,2;3,4]일 때 inv(x)=[[-2,1],[1.5,-0.5]]');
									break;	
								case 'exp':
									$('#how-to-use').text('exp(x) -> 예) x=1.3일 때 exp(1.3)=3.66929666');
									break;
								case 'log':
									$('#how-to-use').text('log(진수,밑) -> 예)log(4,2)=2 단, 밑 적지 않으면 밑은 자연상수' );
									break;	
								case 'sqrt':
									$('#how-to-use').text('sqrt(x) -> 예) x=9일 때 sqrt(9)=3');
									break;	
								}
								$('#how-to-use').css('visibility', 'visible');
							}
							else if($(this).hasClass('arithmetic-key') || $(this).hasClass('etc-key')) {
								coloredData.push($(this).text().fontcolor("Darkorange"));
							}
							else if($(this).hasClass('symbol-key')) {
								coloredData.push($(this).text().fontcolor("green"));
							}
							else if($(this).hasClass('parenthesis-key')) {
								coloredData.push($(this).text().fontcolor("MediumOrchid"));
							}
							else
							{
								coloredData.push($(this).text());
							}
							
							if($(this).hasClass('function-key')) {
								$('#input').append(coloredData.slice(-1).pop());
								coloredData.push('('.fontcolor("MediumOrchid"));
							}
							
							if(!$(this).hasClass('function-key') && $('#how-to-use').css('visibility') == 'visible') {
								$('#how-to-use').css('visibility', 'hidden');
							}
	
							$('#input').append(coloredData.slice(-1).pop());	// 배열의 마지막을 input에 넣어줌
							valueData = $('#input').text();	// input의 text를 그대로 valueData에 저장
                        }
                    }

                    e.preventDefault()
                })
            })
        })