package fibonacci;

import java.math.BigInteger;

public class Fibonacci {

	public static void main(String[] args) {
		BigInteger fibo[] = new BigInteger[100];//�½�����洢���е�ǰһ����
		fibo[0] = fibo[1] = BigInteger.ONE;//��ʼ����һ����ڶ���

		for(int i = 2; i < 100; i++){
			fibo[i]=fibo[i-1].add(fibo[i-2]);//����ѭ����ÿһ�ֵ
		}

		for(int j = 0; j < 100; j++){
			System.out.println(fibo[j]);//���
		}

	}

}
