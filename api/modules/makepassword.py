import string
import random


def pwd(number=10, punc="!^*()_+-"):
    alphabet = string.ascii_letters + string.digits + punc


    while True:
        result = []
        flag = True
        test = random.choice(alphabet)
        if test in string.ascii_letters:  # 첫번쨰 글자 관련 조건문
            result.append(test)
            pass
        else:
            continue
        while len(result) != number:
            temp = random.choice(alphabet)
            result.append(temp)

        test = "".join(result)

        if (any(c in test for c in punc)):
            for i in range(len(test) - 2):
                if (test[i] == test[i + 1]) and (test[i] == test[i + 2]):
                    flag = False
                    break
                else:
                    flag = True


        else:
            continue

        if flag == True:
            return test

        else:
            continue



print(pwd())
