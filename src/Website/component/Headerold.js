    <ul className="navbar-nav justify-content-center col-lg-12">
                                <li className="nav-item dropdown">
                                    <Link className="nav-link nav-link_Res navFS" href="#">Women</Link>
                                    <div className="dropdown-content p-4">
                                        <div className="header">
                                            <p className='navMH'>All Women</p>
                                        </div>
                                        <div className="row">
                                            {
                                                list && list.length > 0 && list.map((item, index) => {
                                                    let parentname = '';
                                                    if (item.parent_id !== parentDefault) {

                                                        let parentData = list.find(ca => ca._id === item.parent_id);
                                                        parentname = (parentData && parentData.name) ? parentData.name : '';

                                                    }
                                                    return <div className="col-md-2" key={index}>
                                                        <p className='navMH text-start'>{item.name}</p>
                                                        <Link className="navlinkmul" to="">{parentname}</Link>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS" to="#">Girls</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" to="#">Sale</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-link_Res navFS text-white" to="#">Trending</Link>
                                </li>
                            </ul> */}