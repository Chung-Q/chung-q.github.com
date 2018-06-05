$(document).ready(function(){
            var parser = math.parser();

            var valueData = '0';
			var coloredData = new Array();	// �� ��ȯ ���� ���ڿ� ����
			
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
							$('#history').scrollTop($('#history').get(0).scrollHeight);	// ��ũ���� �׻� �Ʒ��� ����
							valueData = '0';
							coloredData = new Array();
							$('#input').text('');	// ��� �ʱ�ȭ
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
                            $('#input').text('');	// ��� �ʱ�ȭ
                        }
						else if($(this).text() == '��')
						{
							valueData = valueData.slice(0,-1);	// ������ ������ ����
							coloredData.pop();	// �迭�� ������ ����
							$('#input').text('');	// input ����ְ�
							$.each(coloredData, function(index, item) {
								$('#input').append(item);
							});	// �迭�� �������� �ٽ� ä����
						}
                        else
                        {   
							// ������ ��ư ���� �ԷµǴ� �۾��� ���� �ٲ���
							// function-key: ��, arithmetic-key+etc-key: ��, symbol-key: ��, parenthesis-key: ��
							if($(this).hasClass('function-key')) {
								coloredData.push($(this).text().fontcolor("red"));
								// �Լ� ��ư ������ ����, ���ð� ȭ�鿡 ��Ÿ��
								switch ($(this).text()) {
								
								case 'sin': 
									$('#how-to-use').text('sin(x) -> ��) sin(10)=-0.54402111...');
									break;
								case 'cos':
									$('#how-to-use').text('cos(x) -> ��) cos(10)=-0.83907152...');
									break;	
								case 'tan':
									$('#how-to-use').text('tan(x) -> ��) tan(10)=0.64836082...');
									break;	
								case 'dot':
									$('#how-to-use').text('���ͳ��� -> ��) x=[2,3] y=[3,2]�� �� dot(x,y)=12');
									break;	
								case 'cross':
									$('#how-to-use').text('���Ϳ��� -> ��) x=[1,2,3] y=[3,2,1]�� �� cross(x,y)=[-4,8,-4]');
									break;
								case 'det':
									$('#how-to-use').text('��Ľ� -> ��) x=[1,2;3,4]�� �� det(x)=-2');
									break;	
								case 'inv':
									$('#how-to-use').text('����� -> ��) x=[1,2;3,4]�� �� inv(x)=[[-2,1],[1.5,-0.5]]');
									break;	
								case 'exp':
									$('#how-to-use').text('exp(x) -> ��) x=1.3�� �� exp(1.3)=3.66929666');
									break;
								case 'log':
									$('#how-to-use').text('log(����,��) -> ��)log(4,2)=2 ��, �� ���� ������ ���� �ڿ����' );
									break;	
								case 'sqrt':
									$('#how-to-use').text('sqrt(x) -> ��) x=9�� �� sqrt(9)=3');
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
	
							$('#input').append(coloredData.slice(-1).pop());	// �迭�� �������� input�� �־���
							valueData = $('#input').text();	// input�� text�� �״�� valueData�� ����
                        }
                    }

                    e.preventDefault()
                })
            })
        })