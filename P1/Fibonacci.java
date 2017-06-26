package fibonacci;

import java.math.BigInteger;

public class Fibonacci {

	public static void main(String[] args) {
		BigInteger fibo[] = new BigInteger[100];//新建数组存储数列的前一百项
		fibo[0] = fibo[1] = BigInteger.ONE;//初始化第一项与第二项

		for(int i = 2; i < 100; i++){
			fibo[i]=fibo[i-1].add(fibo[i-2]);//利用循环给每一项赋值
		}

		for(int j = 0; j < 100; j++){
			System.out.println(fibo[j]);//输出
		}

	}

}
