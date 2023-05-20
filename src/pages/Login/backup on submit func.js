const { register, handleSubmit, errors, setError } = useForm();
const [status, setStatus] = React.useState(statusList.idle);
const dispatch = useDispatch();
const history = useHistory();

const onSubmit = async ({ email, password }) => {

  setStatus(statusList.process);

  let { data, message, _error_ } = await login(email, password);

  if (_error_) {
    setError("password", {
      type: "invalidCredential",
      message,
    });

    setStatus(statusList.error);
  } else {
    let {
      data: {
        name,
        token
      } } = data;

    dispatch(userLogin(name, token));

    history.push("/");
  }

  setStatus(statusList.success);
};