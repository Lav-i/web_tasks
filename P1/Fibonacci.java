package fibonacci;

public class Fibonacci {

	public static void main(String[] args) {
		
		StringBuffer fib = new StringBuffer("11");//�������ڴ洢���е��ַ���������
		int i,j,k;//�����������ͱ��������ڼ��������е�ÿһ��
		i=1;//��ʼ����һ��
		j=1;//��ʼ���ڶ���
		while(fib.length()<100){//�����г��Ȳ�����Ҫ��ʱ��������һ�������һ����ӵ��ַ�����
			k=i+j;//������һ��
			fib.append(k);//������ַ���������
			i=j;
			j=k;
		}
		
		fib.delete(100,fib.length());//ɾ�����������������֣���һ�ٸ�����֮��ģ�
		System.out.println(fib);//��������ַ���
	}

}
