package fibonacci;

import java.math.BigInteger;
import java.util.Scanner;

public class Fibonacci {

//	public static void main(String[] args) {
//		
//		StringBuffer fib = new StringBuffer("11");//�������ڴ洢���е��ַ���������
//		int i,j,k;//�����������ͱ��������ڼ��������е�ÿһ��
//		i=1;//��ʼ����һ��
//		j=1;//��ʼ���ڶ���
//		while(fib.length()<100){//�����г��Ȳ�����Ҫ��ʱ��������һ�������һ����ӵ��ַ�����
//			k=i+j;//������һ��
//			fib.append(k);//������ַ���������
//			i=j;
//			j=k;
//		}
//		
//		fib.delete(100,fib.length());//ɾ�����������������֣���һ�ٸ�����֮��ģ�
//		System.out.println(fib);//��������ַ���
//	}
	
	public static void main(String[] args) {
		BigInteger fib[] = new BigInteger[100]; // ʹ��BigInteger��������
		fib[0] = fib[1] = BigInteger.ONE; // ��ʼ������ֵΪ1
		System.out.println("������n��ֵ");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		{
			for (int i = 2; i < n; i++) {
				fib[i] = fib[i - 1].add(fib[i - 2]);
			}
		}
		for (int j = 0; j < n; j++) {
			System.out.println(fib[j]); // ѭ����������ֵ
		}
	}

}
