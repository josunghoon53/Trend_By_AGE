export const groupBy = function (data, key) {
	return data.reduce(function (carry, el) {
			var group = el[key];

			if (carry[group] === undefined) {
					carry[group] = []
			}

			carry[group].push(el)
			return carry
	}, {})
}

