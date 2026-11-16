export const inferred = [1, 2]; inferred.push(3);
// @ts-expect-error -- The initializer inferred number[].
inferred.push('3');
