package fibonacci;

import java.math.BigInteger;
import java.util.Scanner;

public class Fibonacci {

//	public static void main(String[] args) {
//		
//		StringBuffer fib = new StringBuffer("11");//创建用于存储数列的字符串缓冲区
//		int i,j,k;//定义三个整型变量，用于计算数列中的每一项
//		i=1;//初始化第一项
//		j=1;//初始化第二项
//		while(fib.length()<100){//当数列长度不满足要求时，计算下一项，并将下一项添加到字符串中
//			k=i+j;//计算下一项
//			fib.append(k);//添加至字符串缓冲区
//			i=j;
//			j=k;
//		}
//		
//		fib.delete(100,fib.length());//删除不满足条件的数字（第一百个数字之后的）
//		System.out.println(fib);//输出缓冲字符串
//	}
	
	public static void main(String[] args) {
		BigInteger fib[] = new BigInteger[100]; // 使用BigInteger定义数组
		fib[0] = fib[1] = BigInteger.ONE; // 初始化数组值为1
		System.out.println("请输入n的值");
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		{
			for (int i = 2; i < n; i++) {
				fib[i] = fib[i - 1].add(fib[i - 2]);
			}
		}
		for (int j = 0; j < n; j++) {
			System.out.println(fib[j]); // 循环输出数组的值
		}
	}

}
